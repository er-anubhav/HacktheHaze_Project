from typing import List
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse
import asyncio

from scraper import scrape_images

app = FastAPI(title="HacktheHaze API", 
              description="API for scraping images from websites",
              version="1.0.0")

# Get allowed origins from environment variable or use defaults
default_origins = [
    # Development origins
    "http://localhost:5173",  # Frontend dev server (Vite default)
    "http://localhost:8080",  # Frontend dev server (alternative port)
    "http://localhost:3000",  # Another common development port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080", 
    "http://127.0.0.1:3000",
    # Production origins - update with your actual Vercel domain when deployed
    "https://hackthehaze.vercel.app",
    "https://hackthehaze-project.vercel.app",
]

# Get frontend URL from environment variable (set by Render)
frontend_url = os.environ.get("FRONTEND_URL")
if frontend_url and frontend_url not in default_origins:
    default_origins.append(frontend_url)

# Allow all origins in development for easier debugging
# In production, you should specify exact origins
allow_all = os.environ.get("ALLOW_ALL_ORIGINS", "").lower() == "true"
origins = ["*"] if allow_all else default_origins

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=not allow_all,  # Must be False if allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    urls: List[str]

@app.post("/scrape")
async def scrape_endpoint(request: ScrapeRequest):
    urls = request.urls
    results = {}
    errors = []
    valid_urls = []

    # Validate URLs
    for url in urls:
        parsed = urlparse(url)
        # Basic URL validation: must have scheme and network location
        if not parsed.scheme or not parsed.netloc:
            errors.append({"url": url, "error": "Invalid URL format"})
        elif parsed.scheme not in ("http", "https"):
            errors.append({"url": url, "error": "Invalid URL format"})
        else:
            valid_urls.append(url)

    # Scrape images for valid URLs
    if valid_urls:
        tasks = [scrape_images(url) for url in valid_urls]
        results_list = await asyncio.gather(*tasks, return_exceptions=True)
        for url, res in zip(valid_urls, results_list):
            if isinstance(res, Exception):
                errors.append({"url": url, "error": str(res)})
            else:
                results[url] = res

    return {"results": results, "errors": errors}

if __name__ == "__main__":
    import uvicorn
    from dotenv import load_dotenv
    
    # Load environment variables from .env file
    load_dotenv()
    
    # Get host and port from environment variables or use defaults
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    
    print(f"Starting server at http://{host}:{port}")
    uvicorn.run(app, host=host, port=port)

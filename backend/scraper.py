from typing import List
from urllib.parse import urljoin, urlparse
import httpx
from bs4 import BeautifulSoup, Tag

async def scrape_images(url: str) -> List[str]:
    async with httpx.AsyncClient() as client:
        response = await client.get(url, follow_redirects=True)
        response.raise_for_status()
        html = response.text

    soup = BeautifulSoup(html, "html.parser")
    images = []
    seen = set()

    allowed_ext = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}

    for img in soup.find_all("img"):
        if not isinstance(img, Tag):
            continue

        src = img.get("src")
        if not src:
            continue

        img_url = urljoin(url, str(src))
        parsed = urlparse(img_url)

        if parsed.scheme != "https":
            continue

        path = parsed.path.lower()
        ext = '.' + path.split('.')[-1] if '.' in path else ''
        if ext not in allowed_ext:
            continue

        clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
        if clean_url in seen:
            continue

        seen.add(clean_url)
        images.append(clean_url)

    return images

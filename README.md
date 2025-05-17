# HacktheHaze Project

A web application that scrapes images from websites, built with a FastAPI backend and React frontend.

## Project Structure

- `backend/`: FastAPI backend for image scraping
- `frontend/`: React frontend built with Vite and Shadcn UI

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment (recommended):
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. Install the required packages:
   ```powershell
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```powershell
   python main.py
   ```

   The backend API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   # or if you have bun installed:
   # bun install
   ```

3. Start the development server:
   ```powershell
   npm run dev
   # or with bun:
   # bun run dev
   ```

   The frontend will be available at http://localhost:5173

## API Endpoints

- `POST /scrape` - Scrape images from provided URLs
  - Request body: `{ "urls": ["https://example.com", ...] }`
  - Response: `{ "results": { "url": ["image_url1", ...] }, "errors": [] }`

## Environment Configuration

The frontend connects to the backend API using the URL specified in the `.env` file.
The default configuration assumes the backend is running at http://localhost:8000.

If you need to change the backend URL, modify the `VITE_API_URL` variable in the `.env` file.

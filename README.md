# HacktheHaze Project
A web application that scrapes images from websites, built with a FastAPI backend and React frontend.

## Live Demo

- **Frontend:** [https://hackthehaze-project.vercel.app/](https://hackthehaze-project.vercel.app/)
- **Backend API:** [https://hackthehaze-project.onrender.com](https://hackthehaze-project.onrender.com)

## Project Overview

HacktheHaze is a modern web application designed to extract and organize images from websites. It provides:

- **Fast, concurrent web scraping** - Efficiently process multiple URLs in parallel
- **Secure image filtering** - Focus on HTTPS images only for security
- **Automatic deduplication** - Eliminate redundant image URLs
- **User-friendly interface** - Clean, responsive UI with multiple view options
- **User authentication** - Store scraping history for registered users
- **Cloud deployment** - Production-ready deployment on Vercel and Render

Perfect for researchers, designers, content creators, and anyone needing to collect and analyze images from websites.

## Tech Stack

### Backend
- **Python 3.11+**
- **FastAPI** - Modern asynchronous web framework
- **HTTPX** - Asynchronous HTTP client
- **BeautifulSoup4** - HTML parsing
- **Uvicorn** - ASGI server

### Frontend
- **TypeScript**
- **React 18**
- **Vite** - Build tool and development server
- **Shadcn UI** - Component library built on Radix UI
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Authentication and database
- **React Query** - Server state management
- **Axios** - HTTP client

## Screenshots

### Home Page
![Home Page](https://raw.githubusercontent.com/er-anubhav/hackthehaze/main/screenshots/home-page.png)

### Scrape History
![Scrape History](https://github.com/er-anubhav/HacktheHaze_Project/blob/main/screenshots/scrape-history.png)

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

## Deployment

This project is deployed with:

- Frontend hosted on [Vercel](https://vercel.com)
- Backend hosted on [Render](https://render.com)

For detailed deployment instructions, see the [DEPLOYMENT.md](./DEPLOYMENT.md) file.

If you encounter any issues, refer to the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) file for solutions to common problems.

## Demo GIF

![HacktheHaze Demo](https://raw.githubusercontent.com/yourusername/hackthehaze/main/screenshots/demo.gif)
<!-- Replace with actual demo GIF once available -->

## Features

- **URL Input** - Enter multiple URLs at once (separated by commas or new lines)
- **Image Scraping** - Extract images from websites asynchronously
- **Image Filtering** - Focus on high-quality, secure images
- **Multiple View Options** - Switch between grid and list views
- **Copy Functionality** - Easily copy individual or all image URLs
- **History Tracking** - Store and view past scraping sessions (for registered users)
- **Responsive Design** - Works on desktop and mobile devices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Deployment Instructions for HacktheHaze

This guide covers deploying the HacktheHaze project with the backend on Render and the frontend on Vercel.

## Backend Deployment (Render)

### Prerequisites
- A Render account (https://render.com)
- Git repository with your project

### Steps

1. **Log in to Render**
   - Go to https://dashboard.render.com
   - Sign in with your account

2. **Create a new Web Service**
   - Click "New +"
   - Select "Web Service"

3. **Connect your repository**
   - Connect to your Git provider
   - Select the repository containing the HacktheHaze project
   - Select the branch you want to deploy (usually `main`)

4. **Configure the service**
   - Name: `hackthehaze-api` (or your preferred name)
   - Environment: `Python`
   - Region: Choose a region closest to your users
   - Branch: `main` (or your deployment branch)
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Select a plan (Free tier works for development)

5. **Set environment variables**
   - ALLOW_ALL_ORIGINS: `false`
   - FRONTEND_URL: `https://your-frontend-domain.vercel.app` (update after Vercel deployment)
   - Add any other environment variables your app needs

6. **Create the Web Service**
   - Click "Create Web Service"
   - Wait for the deployment to complete

7. **Note the URL**
   - When deployment is complete, Render will provide you with a URL like `https://hackthehaze-api.onrender.com`
   - Save this URL for configuring your frontend

## Frontend Deployment (Vercel)

### Prerequisites
- A Vercel account (https://vercel.com)
- Git repository with your project

### Steps

1. **Log in to Vercel**
   - Go to https://vercel.com/dashboard
   - Sign in with your account

2. **Import the Project**
   - Click "Add New" → "Project"
   - Connect to your Git provider
   - Select the repository containing the HacktheHaze project
   - Vercel will detect it's a Vite project

3. **Configure the project**
   - Project Name: `hackthehaze` (or your preferred name)
   - Framework Preset: `Vite`
   - Root Directory: `frontend` (important - if your frontend code is in a subfolder)
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)

4. **Environment Variables**
   - Add an environment variable:
     - Name: `VITE_API_URL`
     - Value: The backend URL from Render (e.g., `https://hackthehaze-api.onrender.com`)

5. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete

6. **Update Backend Configuration**
   - Go back to your Render dashboard
   - Update the `FRONTEND_URL` environment variable with your new Vercel domain
   - This will update the CORS settings to allow requests from your frontend

## Testing the Deployment

1. Open your Vercel-hosted frontend application
2. Try the image scraping functionality
3. Check the browser console for any CORS or connection errors

## Troubleshooting

### CORS Issues
- Ensure the Vercel domain is correctly added to the allowed origins in the backend
- Check that the FRONTEND_URL environment variable in Render is set correctly
- Temporarily set ALLOW_ALL_ORIGINS to true for testing

### API Connection Issues
- Check that the VITE_API_URL is correct in Vercel's environment variables
- Ensure the backend is running and accessible
- Try accessing the backend URL directly to check if it's responding

### Build Errors
- Check the build logs in Vercel or Render for specific error messages
- Ensure all dependencies are correctly specified in package.json and requirements.txt

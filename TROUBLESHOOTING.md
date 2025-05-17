# Troubleshooting Guide

This guide addresses common issues you might encounter when running the HacktheHaze project.

## CORS Issues

If you see errors like:

```
Access to XMLHttpRequest at 'http://localhost:8000/scrape' from origin 'http://localhost:8080' has been blocked by CORS policy
```

### Solutions:

1. **Check that backend is running**
   
   Make sure the backend server is running on the expected port (default: 8000).

2. **Verify the frontend configuration**
   
   Ensure the frontend's `.env` file has the correct backend URL:
   ```
   VITE_API_URL=http://localhost:8000
   ```

3. **Allow all origins in development**
   
   In the backend `.env` file, set:
   ```
   ALLOW_ALL_ORIGINS=true
   ```
   Then restart the backend server.

4. **Add specific origins**
   
   If you need to add a specific origin, edit the `default_origins` list in `backend/main.py`.

5. **Clear browser cache**
   
   Sometimes browsers cache CORS errors. Try:
   - Opening a new incognito/private window
   - Clearing browser cache
   - Hard reloading the page (Ctrl+Shift+R or Cmd+Shift+R)

6. **Network configuration**
   
   If using a proxy or VPN, this might affect CORS behavior.

## API Connection Issues

If the frontend can't connect to the backend:

1. **Check network connectivity**
   
   Make sure there are no firewalls or network issues blocking the connection.

2. **Verify server logs**
   
   Look at the backend terminal output for any errors.

3. **Check for typos in URLs**
   
   Ensure the URLs in both frontend and backend configurations are correct.

## Image Scraping Issues

If no images are being returned:

1. **URL format**
   
   Make sure URLs include the protocol (`https://` or `http://`).

2. **Website restrictions**
   
   Some websites block scraping attempts.

3. **Timeout issues**
   
   Very large websites might cause timeouts.

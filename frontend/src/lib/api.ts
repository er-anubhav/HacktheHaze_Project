// filepath: src/lib/api.ts
import axios from 'axios';

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 
                (import.meta.env.PROD 
                  ? 'https://hackthehaze-api.onrender.com' 
                  : 'http://localhost:8000');

console.log('API URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true only if backend requires credentials
});

export interface ScrapeRequest {
  urls: string[];
}

export interface ScrapeResponse {
  results: Record<string, string[]>;
  errors: Array<{ url: string; error: string }> | null;
}

export const scrapeImages = async (urls: string[]): Promise<ScrapeResponse> => {
  const response = await apiClient.post<ScrapeResponse>('/scrape', { urls });
  return response.data;
};

export default apiClient;

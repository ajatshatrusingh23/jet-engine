import axios from 'axios';

// This is the live URL you got from deploying your backend.
// Replace it with your actual backend URL.
const VITE_API_URL = 'https://jet-engines-api-final.vercel.app'; // <--- PASTE YOUR URL HERE

// This checks if the app is in production (deployed on Vercel).
// If it is, it uses the live URL.
// If it's not (your local machine), it uses a relative path, which will be caught by your Vite proxy.
const API_URL = import.meta.env.PROD
  ? VITE_API_URL
  : '/';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
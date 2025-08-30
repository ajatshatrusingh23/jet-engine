// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "https://jet-engine-api.vercel.app/api",  // replace with your backend deployed link
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

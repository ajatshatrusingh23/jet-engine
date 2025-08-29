 import axios from "axios";

const ke = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // should be https://jet-engine-api.vercel.app
});

export default ke;

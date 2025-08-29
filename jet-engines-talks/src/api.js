  
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/posts`);
  return response.json();
};

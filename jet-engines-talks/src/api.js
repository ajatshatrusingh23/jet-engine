 const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = async () => {
  const res = await fetch(`${API_BASE_URL}/api/posts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
};

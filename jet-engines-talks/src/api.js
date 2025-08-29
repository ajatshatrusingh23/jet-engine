 const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts`);
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};

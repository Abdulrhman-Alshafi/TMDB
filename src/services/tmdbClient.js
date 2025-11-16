const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  // Always attach API key
  url.searchParams.set("api_key", API_KEY);

  // Attach additional params
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.status_message || `HTTP ${res.status}`);
  }

  return res.json();
}

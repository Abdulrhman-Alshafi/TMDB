import { API_KEY } from "../request";

const tmdbFetch = async (endpoint) => {
    const url = `https://api.themoviedb.org/3${endpoint}`;
    const res = await fetch(url);

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.status_message || `HTTP ${res.status}`);
    }

    return res.json();
};

export default tmdbFetch;
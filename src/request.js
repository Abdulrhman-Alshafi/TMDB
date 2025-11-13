const API_KEY = "a02ca25342506955df019d0a42871de2";

const requests = {
  fetchPopular: `/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=en-US`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `discover/movie?api_key=${API_KEY}&with_genres=99`,
  // ✅ Add this for the banner / hero background image
  fetchBannerMovie: `/discover/movie?api_key=${API_KEY}`,
  // 🔥 Trending movies of the day
  fetchTrendingToday: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
};

export default requests;

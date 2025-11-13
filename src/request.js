const API_KEY = "a02ca25342506955df019d0a42871de2";

const requests = {
  // Movie endpoints
  fetchPopularMovies: `/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchBannerMovie: `/discover/movie?api_key=${API_KEY}`,
  fetchTrendingMoviesToday: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
  fetchTrendingMoviesWeek: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,

  // TV endpoints
  fetchTrendingTVToday: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  fetchTrendingTVWeek: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

export default requests;
export { API_KEY };

const API_KEY = "a02ca25342506955df019d0a42871de2";

const requests = {
  // Movie endpoints
  fetchTrendingMoviesToday: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
  fetchTrendingMoviesWeek: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,

  // TV endpoints
  fetchTrendingTVToday: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  fetchTrendingTVWeek: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

export default requests;
export { API_KEY };

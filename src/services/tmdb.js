import { tmdbFetch } from "./tmdbClient";
import endpoints from "./endpoints";

export const TMDB = {
  // Trending
  getTrendingMoviesToday: () =>
    tmdbFetch(endpoints.trendingMovieToday, { language: "en-US" }),

  getTrendingMoviesWeek: () =>
    tmdbFetch(endpoints.trendingMovieWeek, { language: "en-US" }),

  getTrendingTVToday: () =>
    tmdbFetch(endpoints.trendingTVToday, { language: "en-US" }),

  getTrendingTVWeek: () =>
    tmdbFetch(endpoints.trendingTVWeek, { language: "en-US" }),

  getTrendingAllWeek: () =>
    tmdbFetch(endpoints.trendingAllWeek, { language: "en-US" }),

  getTrendingAllDay: () =>
    tmdbFetch(endpoints.trendingAllDay, { language: "en-US" }),

  // Search
  searchMulti: (query) =>
    tmdbFetch(endpoints.searchMulti, {
      query,
      page: 1,
      include_adult: false,
    }),
};

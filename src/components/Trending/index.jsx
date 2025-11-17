import { useEffect, useState } from "react";
import { TMDB } from "../../services/tmdb";
import requests from "../../request";

import ButtonGroup from "../ButtonGroup";
import MoviesWrapper from "../MoviesWrapper";

import {
  TrendingSection,
  ContentWrapper,
  TrendingHeader,
  TrendingTitle,
} from "./Trending.styles";
import { tmdbFetch } from "../../services/tmdbClient";

const Trending = ({
  type = "movie",
  defaultTimeframe = "Today",
  title,
  theme = "light",
}) => {
  const [items, setItems] = useState([]);
  const [timeframe, setTimeframe] = useState(defaultTimeframe);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchTrending() {
      try {
        let data;

        if (type === "movie") {
          data =
            timeframe === "Today"
              ? await TMDB.getTrendingMoviesToday()
              : await TMDB.getTrendingMoviesWeek();
        } else {
          data =
            timeframe === "Today"
              ? await TMDB.getTrendingTVToday()
              : await TMDB.getTrendingTVWeek();
        }

        const normalized = data.results.map((item) => ({
          id: item.id,
          title:
            item.title ||
            item.name ||
            item.original_title ||
            item.original_name,
          overview: item.overview,
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
          vote_average: item.vote_average,
          release_date: item.release_date || item.first_air_date,
          media_type: item.media_type || type,
        }));

        setItems(normalized);
      } catch (error) {
        console.error("Failed to fetch trending:", error);
      }
    }

    fetchTrending();
  }, [timeframe, type]);

  async function fetchBackdrop() {
    try {
      const { results } = await tmdbFetch(requests.fetchTrendingMoviesWeek);
      const random = results[Math.floor(Math.random() * results.length)];
      setMovie(random);
    } catch (error) {
      console.error("Failed to fetch backdrop movie:", error);
    }
  }
  useEffect(() => {
    fetchBackdrop();
  }, []);

  const handleTimeframeChange = (selected) => setTimeframe(selected);

  return (
    <TrendingSection themeMode={theme} backdrop={movie?.backdrop_path}>
      <ContentWrapper themeMode={theme}>
        <TrendingHeader>
          <TrendingTitle themeMode={theme}>{title}</TrendingTitle>

          <ButtonGroup
            btns={["Today", "This Week"]}
            onChange={handleTimeframeChange}
            theme={theme}
          />
        </TrendingHeader>

        <MoviesWrapper movies={items} theme={theme} />
      </ContentWrapper>
    </TrendingSection>
  );
};

export default Trending;

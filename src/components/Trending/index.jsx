import styled from "styled-components";
import ButtonGroup from "../ButtonGroup";
import { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../request";
import MoviesWrapper from "../MoviesWrapper";

const TrendingSection = styled.section`
  padding: 2rem 0;
  width: 100%;
  color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
  background-color: ${({ themeMode }) =>
    themeMode === "dark" ? "#121212" : "#fff"};

  ${({ themeMode, backdrop }) =>
    themeMode === "dark"
      ? `
        background: 
          linear-gradient(
            to right,
            rgba(3, 37, 65, 0.75) 0%,
            rgba(3, 37, 65, 0.75) 100%
          ),
          url("https://image.tmdb.org/t/p/original${backdrop}") no-repeat center/cover;
      `
      : `
        background: #fff;
      `}
`;

const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      to left,
      ${({ themeMode }) => (themeMode === "dark" ? "#121212" : "#fff")},
      rgba(255, 255, 255, 0)
    );
  }
`;

const TrendingHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const TrendingTitle = styled.h2`
  white-space: nowrap;
  font-weight: 600;
  margin-right: 20px;
  color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
`;

const Trending = ({
  type = "movie",
  defaultTimeframe = "Today",
  title,
  theme = "light",
}) => {
  const [items, setItems] = useState([]);
  const [timeframe, setTimeframe] = useState(defaultTimeframe);
  const [movie, setMovie] = useState(0);
  useEffect(() => {
    async function fetchTrending() {
      try {
        let url;

        if (type === "movie") {
          url =
            timeframe === "Today"
              ? requests.fetchTrendingMoviesToday
              : requests.fetchTrendingMoviesWeek;
        } else if (type === "tv") {
          url =
            timeframe === "Today"
              ? requests.fetchTrendingTVToday
              : requests.fetchTrendingTVWeek;
        }

        const res = await axios.get(url);

        // Normalize data shape
        const normalized = res.data.results.map((item) => ({
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
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch trending movies (weekly) for banner
        const response = await axios.get(requests.fetchTrendingMoviesWeek);

        const results = response.data.results;
        const randomMovie = results[Math.floor(Math.random() * results.length)];

        setMovie(randomMovie);
      } catch (error) {
        console.error("Failed to fetch banner movie:", error);
      }
    }

    fetchData();
  }, []);
  console.log(items);
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

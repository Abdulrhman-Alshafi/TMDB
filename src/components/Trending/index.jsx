import styled from "styled-components";
import ButtonGroup from "../ButtonGroup";
import { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../request";
import MoviesWrapper from "../MoviesWrapper";

const TrendingSection = styled.section`
  padding: 2rem 0;
  background-color: ${({ themeMode }) =>
    themeMode === "dark" ? "#121212" : "#fff"};
  color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
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
        setItems(res.data.results);
      } catch (error) {
        console.error("Failed to fetch trending:", error);
      }
    }

    fetchTrending();
  }, [timeframe, type]);

  const handleTimeframeChange = (selected) => setTimeframe(selected);

  return (
    <TrendingSection themeMode={theme}>
      <ContentWrapper themeMode={theme}>
        <TrendingHeader>
          <TrendingTitle themeMode={theme}>{title}</TrendingTitle>
          <ButtonGroup
            btns={["Today", "This Week"]}
            onChange={handleTimeframeChange}
          />
        </TrendingHeader>

        <MoviesWrapper movies={items} theme={theme} />
      </ContentWrapper>
    </TrendingSection>
  );
};

export default Trending;

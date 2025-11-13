import styled from "styled-components";
import ButtonGroup from "../ButtonGroup";
import { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../request";
import listBg from "../../assets/list.svg"; // adjust path
import more from "../../assets/more.svg";
import PercentageCircle from "../PercentageCircle";

// --- Styled Components ---

const TrendingSection = styled.section`
  padding: 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
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
`;

const MoviesWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 40px;
  background: url(${listBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100% 145%;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 80px; /* width of gradient */
    height: 100%;
    pointer-events: none; /* allows scrolling under the gradient */
    background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
  }
`;

const MovieCard = styled.article`
  flex: 0 0 auto;
  width: 150px;
  min-width: 150px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
`;

const MovieImageWrapper = styled.div`
  width: 100%;
  height: 225px;
  background: #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    width: fit-content;
    height: fit-content;
    border: none;
    background-color: transparent;
    cursor: pointer;

    img {
      height: 26px;
      width: auto;
      opacity: 0.6;
      transition: opacity 0.3s;

      &:hover {
        filter: brightness(0) saturate(100%) invert(73%) sepia(16%)
          saturate(4897%) hue-rotate(174deg) brightness(97%) contrast(97%);
        opacity: 1;
      }
    }
  }
`;
const MovieInfo = styled.div`
  padding: 26px 10px 12px;
  position: relative;
  line-height: 1.2;
  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.1;
  }

  p {
    font-size: 1em;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.6);
  }
`;
const PercentageCircleP = styled.div`
  position: absolute;
  top: -18px;
  left: 10px;
`;
// --- Component ---

const Trending = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await axios.get(requests.fetchTrendingToday);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    }
    fetchTrending();
  }, []);
  console.log(movies);
  // Helper function to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <TrendingSection>
      <ContentWrapper>
        <TrendingHeader>
          <TrendingTitle>Trending</TrendingTitle>
          <ButtonGroup btns={["Today", "This Week"]} />
        </TrendingHeader>

        <MoviesWrapper>
          {movies.length === 0 && <p>Loading...</p>}
          {movies.map((movie) => (
            <MovieCard key={movie.id}>
              <MovieImageWrapper>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                />
                <button>
                  <img src={more} alt="" />
                </button>
              </MovieImageWrapper>
              <MovieInfo>
                <PercentageCircleP>
                  <PercentageCircle
                    percent={parseInt(movie.vote_average * 10)}
                  />
                </PercentageCircleP>
                <h3>{movie.title}</h3>
                <p>{formatDate(movie.release_date)}</p>
              </MovieInfo>
            </MovieCard>
          ))}
        </MoviesWrapper>
      </ContentWrapper>
    </TrendingSection>
  );
};

export default Trending;

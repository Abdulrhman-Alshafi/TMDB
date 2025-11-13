import styled from "styled-components";
import more from "../../assets/more.svg";
import PercentageCircle from "../PercentageCircle";

const Card = styled.article`
  flex: 0 0 auto;
  width: 150px;
  min-width: 150px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-color: ${({ themeMode }) =>
    themeMode === "dark" ? "#1e1e1e" : "transparent"};
  color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
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
    color: ${({ themeMode }) =>
      themeMode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"};
  }
`;

const PercentageCircleP = styled.div`
  position: absolute;
  top: -18px;
  left: 10px;
`;

const MovieCard = ({ movie, theme = "light" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card themeMode={theme}>
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
      <MovieInfo themeMode={theme}>
        <PercentageCircleP>
          <PercentageCircle percent={parseInt(movie.vote_average * 10)} />
        </PercentageCircleP>
        <h3>{movie.title}</h3>
        <p>{formatDate(movie.release_date)}</p>
      </MovieInfo>
    </Card>
  );
};

export default MovieCard;

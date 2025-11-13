import styled, { keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import more from "../../assets/more.svg";
import PercentageCircle from "../PercentageCircle";
import { ListPlus, Heart, BookmarkPlus, Star } from "lucide-react"; // lucide.dev icons

const Card = styled.article`
  position: relative;
  flex: 0 0 auto;
  width: 150px;
  min-width: 150px;
  border-radius: 8px;

  transition: transform 0.3s ease;
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
    z-index: 10;

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

// Fade-in for overlay
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Slide down for menu
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Overlay covers entire card
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: 5;
  animation: ${fadeIn} 0.2s ease forwards;
`;

// Animated menu
const Menu = styled.ul`
  list-style: none;
  background: #fff;
  border-radius: 8px;
  padding: 8px 0;
  width: 130px;
  color: rgba(30, 30, 30, 0.95);
  font-size: 0.9rem;
  position: absolute;
  top: 40px;
  right: -40px;
  z-index: 20;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: ${slideDown} 0.2s ease forwards;
  li {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-bottom: 1px #dbdbdb solid;
    transition: background 0.2s ease;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const MovieCard = ({ movie, theme = "light" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef();

  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Card themeMode={theme} ref={wrapperRef}>
      <MovieImageWrapper>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={movie.title}
        />
        {!menuOpen && (
          <button onClick={() => setMenuOpen(true)}>
            <img src={more} alt="menu" />
          </button>
        )}
      </MovieImageWrapper>

      <MovieInfo themeMode={theme}>
        <PercentageCircleP>
          <PercentageCircle percent={parseInt(movie.vote_average * 10)} />
        </PercentageCircleP>
        <h3>{movie.title}</h3>
        <p>{formatDate(movie.release_date)}</p>
      </MovieInfo>

      {menuOpen && (
        <>
          <Overlay />
          <Menu>
            <li>
              <ListPlus /> Add to List
            </li>
            <li>
              <Heart /> Favorite
            </li>
            <li>
              <BookmarkPlus /> Watchlist
            </li>
            <li>
              <Star /> Your Rating
            </li>
          </Menu>
        </>
      )}
    </Card>
  );
};

export default MovieCard;

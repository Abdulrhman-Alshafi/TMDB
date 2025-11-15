import { useState, useRef } from "react";
import {
  Card,
  MovieImageWrapper,
  MovieInfo,
  PercentageCircleP,
  Overlay,
  Menu,
} from "./MovieCard.styles";

import more from "../../assets/more.svg";
import PercentageCircle from "../PercentageCircle";
import { ListPlus, Heart, BookmarkPlus, Star } from "lucide-react";

const MovieCard = ({ movie, theme = "light" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef();

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

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

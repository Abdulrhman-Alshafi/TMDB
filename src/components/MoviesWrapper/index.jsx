
import MovieCard from "../MovieCard";
import { Wrapper } from "./MoviesWrapper.styles";

const MoviesWrapper = ({ movies, theme = "light" }) => {
  if (!movies.length)
    return (
      <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>Loading...</p>
    );

  return (
    <Wrapper themeMode={theme}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} theme={theme} />
      ))}
    </Wrapper>
  );
};

export default MoviesWrapper;

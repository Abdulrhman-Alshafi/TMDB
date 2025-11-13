import styled from "styled-components";
import listBg from "../../assets/list.svg";
import MovieCard from "../MovieCard";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 40px;
  background: ${({ themeMode }) =>
    themeMode === "dark" ? "#121212" : `url(${listBg}) no-repeat`};
  background-size: ${({ themeMode }) =>
    themeMode === "dark" ? "cover" : "100% 145%"};
`;

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

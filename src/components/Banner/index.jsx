// Banner/index.jsx
import React, { useEffect, useState } from "react";
import tmdbFetch from "../../services/tmdb";
import requests from "../../request";
import {
  BannerContainer,
  BannerContents,
  BannerTitle,
  BannerDescription,
  SearchForm,
  SearchInput,
  SubmitButton,
} from "./Banner.styles";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { results } = await tmdbFetch(requests.fetchTrendingMoviesWeek);
        const randomMovie = results[Math.floor(Math.random() * results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Failed to fetch banner movie:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <BannerContainer backdrop={movie?.backdrop_path}>
      <BannerContents>
        <BannerTitle>Welcome.</BannerTitle>
        <BannerDescription>
          Millions of movies, TV shows and people to discover. Explore now.
        </BannerDescription>

        <SearchForm action="/search" method="get">
          <SearchInput
            name="query"
            type="text"
            tabIndex="1"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
            placeholder="Search for a movie, tv show, person..."
          />
          <SubmitButton type="submit" value="Search" />
        </SearchForm>
      </BannerContents>
    </BannerContainer>
  );
}

export default Banner;
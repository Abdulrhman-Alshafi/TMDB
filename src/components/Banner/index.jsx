import React, { useEffect, useState } from "react";
import axios from "../../axios";
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
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
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
            placeholder="Search for a movie, tv show, person......"
          />
          <SubmitButton type="submit" value="Search" />
        </SearchForm>
      </BannerContents>
    </BannerContainer>
  );
}

export default Banner;

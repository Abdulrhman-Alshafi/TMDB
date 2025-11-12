import styled from "styled-components";

export const BannerContainer = styled.header`
  color: white;
  background-size: cover;
  background-position: center center;
  margin-top: 50px;
  background-image: ${({ backdrop }) =>
    `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0) 100%), url("https://image.tmdb.org/t/p/original${backdrop}")`};
`;

export const BannerContents = styled.div`
  padding: 5% 5%;
`;

export const BannerTitle = styled.h2`
  width: 100%;
  font-size: 3rem;
  font-weight: 700;
  padding: 0;
`;

export const BannerDescription = styled.h3`
  width: 100%;
  margin-bottom: 50px;
  font-size: 2rem;
  font-weight: 600;
`;

export const SearchForm = styled.form`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 46px;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  color: rgba(0, 0, 0, 0.5);
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(1, 180, 228, 0.4);
  }
`;

export const SubmitButton = styled.input`
  font: inherit;
  color: rgba(255, 255, 255, 1);
  font-weight: 600;
  height: 46px;
  padding: 10px 26px;
  border: none;
  border-radius: 30px;
  background-image: linear-gradient(
    to right,
    rgba(30, 213, 169, 1) 0%,
    rgba(1, 180, 228, 1) 100%
  );
  position: absolute;
  right: -1px;
  top: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

import styled from "styled-components";

export const TrendingSection = styled.section`
  padding: 2rem 0;
  width: 100%;
  color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
  background-color: ${({ themeMode }) =>
        themeMode === "dark" ? "#121212" : "#fff"};

  ${({ themeMode, backdrop }) =>
        themeMode === "dark"
            ? `
    background: 
      linear-gradient(
        to right,
        rgba(3, 37, 65, 0.75) 0%,
        rgba(3, 37, 65, 0.75) 100%
      ),
      url("https://image.tmdb.org/t/p/original${backdrop}") no-repeat center/cover;
  `
            : `
    background: #fff;
  `}
`;

export const ContentWrapper = styled.div`
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

export const TrendingHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

export const TrendingTitle = styled.h2`
  white-space: nowrap;
  font-weight: 600;
  margin-right: 20px;
  color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
`;

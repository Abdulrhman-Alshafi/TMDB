import styled, { keyframes } from "styled-components";

/* Animations */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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

export const Card = styled.article`
  position: relative;
  flex: 0 0 auto;
  width: 150px;
  min-width: 150px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  color: ${({ themeMode }) => (themeMode === "dark" ? "#fff" : "#000")};
`;

/* Poster wrapper */
export const MovieImageWrapper = styled.div`
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
  }

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      height: 26px;
      opacity: 0.6;
      transition: 0.3s;

      &:hover {
        filter: brightness(0) saturate(100%) invert(73%) sepia(16%)
          saturate(4897%) hue-rotate(174deg) brightness(97%) contrast(97%);
        opacity: 1;
      }
    }
  }
`;

export const MovieInfo = styled.div`
  padding: 26px 10px 12px;
  position: relative;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }

  p {
    font-size: 1em;
    margin: 0;
    color: ${({ themeMode }) =>
        themeMode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"};
  }
`;

export const PercentageCircleP = styled.div`
  position: absolute;
  top: -18px;
  left: 10px;
`;

/* Dark blur overlay */
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  z-index: 5;
  animation: ${fadeIn} 0.2s ease forwards;
`;

/* Dropdown menu */
export const Menu = styled.ul`
  list-style: none;
  background: #fff;
  border-radius: 8px;
  padding: 8px 0;
  width: 130px;
  position: absolute;
  top: 40px;
  right: -40px;
  z-index: 20;

  color: rgba(30, 30, 30, 0.95);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  animation: ${slideDown} 0.2s ease forwards;

  li {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-bottom: 1px solid #dbdbdb;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  position: relative;
  border: 1px solid
    ${({ themeMode }) =>
      themeMode === "dark" ? "rgba(30,213,169,1)" : "rgba(3,37,65,1)"};
  border-radius: 30px;
  width: fit-content;
  overflow: hidden;
`;
export const Button = styled.button`
  position: relative;
  background: none;
  border: none;
  border-radius: 20px;
  padding: 4px 20px;
  cursor: pointer;
  z-index: 1;
  font-weight: 600;
  line-height: 1.25rem;
  transition: all 0.3s;
  font-size: 14px;

  /* ---------- base text color ---------- */
  color: ${({ themeMode, active }) =>
    active
      ? themeMode === "dark"
        ? "#000" // dark text on solid bg (dark mode)
        : "transparent" // transparent for clipping (light mode)
      : themeMode === "dark"
      ? "#fff"
      : "rgba(3, 37, 65, 1)"};

  /* ---------- active styles ---------- */
  ${({ active, themeMode }) =>
    active &&
    css`
      /* ---- dark mode: solid gradient background ---- */
      ${themeMode === "dark" &&
      css`
        background: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);
        color: #000; /* dark text */
      `}

      /* ---- light mode: gradient clipped to text ---- */
      ${themeMode === "light" &&
      css`
        background: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      `}
    `}
`;
export const ActiveBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: ${({ themeMode }) =>
    themeMode === "dark" ? "#1e1e1e" : "rgba(3,37,65,1)"};
  border-radius: 30px;
  z-index: 0;
  transition: all 0.3s ease;
`;

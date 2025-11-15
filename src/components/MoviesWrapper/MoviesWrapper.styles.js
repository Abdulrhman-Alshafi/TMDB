import styled from "styled-components";
import listBg from "../../assets/list.svg";

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 40px;
  background: ${({ themeMode }) =>
        themeMode === "dark" ? "" : `url(${listBg}) no-repeat`};
  background-size: ${({ themeMode }) =>
        themeMode === "dark" ? "cover" : "100% 145%"};
`;

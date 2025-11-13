import styled, { css } from "styled-components";

export const Container = styled.div`
  align-items: stretch;
  position: relative;
  display: flex;

  border: 1px solid rgba(3, 37, 65, 1);
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
  transition: color 0.5s;
  font-size: 14px;

  ${({ active }) =>
    active
      ? css`
          background: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `
      : css`
          color: rgba(3, 37, 65, 1);
        `}
`;

export const ActiveBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(3, 37, 65, 1);
  border-radius: 30px;
  z-index: 0;
  transition: all 0.3s ease;
`;

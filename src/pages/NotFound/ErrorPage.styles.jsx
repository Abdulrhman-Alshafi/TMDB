import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h2`
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  margin-bottom: 2rem;
`;

export const HomeLink = styled(Link)`
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

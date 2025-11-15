// src/components/search/SearchResults.styles.jsx
import styled from "styled-components";

export const Results = styled.div`
  flex: 1;
  min-width: 320px;
`;

export const Header = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.5rem;
`;

export const Empty = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 2rem 0;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

export const PageBtn = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  border-radius: 6px;
  background: ${({ disabled }) => (disabled ? "#f0f0f0" : "#007bff")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

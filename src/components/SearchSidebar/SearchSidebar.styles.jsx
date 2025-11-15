// src/components/search/SearchSidebar.styles.jsx
import styled from "styled-components";

export const Sidebar = styled.aside`
  min-width: 260px;
  border: 1px solid rgba(227,227,227,1);
  border-radius: 8px;
  overflow: hidden;
  height: fit-content;

  h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    font-weight: 600;
    padding: 20px;
    color: #fff;
    background-color: rgba(1,180,228,1);
    font-size: 1.2em;
  }
`;

export const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  text-align: left;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  background: ${({ active }) => (active ? "rgba(0,0,0,0.08)" : "transparent")};
  color: black;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { background: rgba(0,0,0,0.04); }

  span {
    color: #000;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 300;
    background-color: rgba(0,0,0,.08);
    padding: 0 10px;
    border-radius: 8px;
    margin-right: 20px;
    white-space: nowrap;
  }
`;

// List of types for search filters
export const typeList = [
    { key: "movie", label: "Movies" },
    { key: "tv", label: "TV Shows" },
    { key: "person", label: "People" },
    { key: "collection", label: "Collections" },
    { key: "company", label: "Companies" },
    { key: "keyword", label: "Keywords" },
    { key: "multi", label: "All" },
];

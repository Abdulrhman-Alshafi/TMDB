// src/components/search/SearchSidebar.jsx
import { Sidebar, SidebarButton } from "./SearchSidebar.styles";

export default function SearchSidebar({ type, counts, onTypeChange }) {
  // List of types for search filters
  const typeList = [
    { key: "movie", label: "Movies" },
    { key: "tv", label: "TV Shows" },
    { key: "person", label: "People" },
    { key: "collection", label: "Collections" },
    { key: "company", label: "Companies" },
    { key: "keyword", label: "Keywords" },
    { key: "multi", label: "All" },
  ];

  return (
    <Sidebar>
      <h3>Search Results</h3>
      {typeList.map(({ key, label }) => (
        <SidebarButton
          key={key}
          active={type === key}
          onClick={() => onTypeChange(key)}
        >
          {label} <span>{counts[key] ?? 0}</span>
        </SidebarButton>
      ))}
    </Sidebar>
  );
}

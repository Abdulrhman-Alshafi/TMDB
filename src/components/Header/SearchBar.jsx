import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import {
  SearchBarContainer,
  SearchWrapper,
  SearchInput,
  NavIcons,
} from "./Header.styles";
import searchDark from "../../assets/search-dark.svg";

import TrendingDropdown from "./TrendingDropdown";
import { API_KEY } from "../../request";
import { debounce } from "../../utils/debounce";
import ClickOutsideWrapper from "./ClickOutsideWrapper";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingError, setTrendingError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchTrending = async () => {
      if (!API_KEY) return setTrendingError(true);
      setTrendingLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setTrending(data.results || []);
      } catch {
        setTrendingError(true);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const performSearch = useCallback(
    debounce((query) => {
      if (!query.trim()) return setSearchResults([]);
      setSearchLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=1`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results || []))
        .catch(() => setSearchError(true))
        .finally(() => setSearchLoading(false));
    }, 300),
    []
  );

  useEffect(() => performSearch(searchText), [searchText, performSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.trim();
    if (!query) return;
    const params = createSearchParams({ query, type: "multi", page: "1" });
    navigate({ pathname: "/search", search: params.toString() });
    setShowDropdown(false);
  };

  return (
    <>
      <SearchBarContainer>
        <SearchWrapper as="form" onSubmit={handleSearch}>
          <button
            type="submit"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <NavIcons src={searchDark} height={20} alt="Search" />
          </button>
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder="Search for a movie, tv show, person..."
            value={searchText}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowDropdown(true);
            }}
          />
          {searchLoading ? (
            <Loader2 size={18} className="lucide-spin" />
          ) : searchText.trim() ? (
            <button
              type="button"
              onClick={() => {
                setSearchText("");
                setShowDropdown(false);
                searchInputRef.current?.focus();
              }}
            >
              <X size={18} />
            </button>
          ) : null}
        </SearchWrapper>
      </SearchBarContainer>
      {showDropdown && (
        <ClickOutsideWrapper onClose={() => setShowDropdown(false)}>
          <TrendingDropdown
            searchText={searchText}
            trending={trending}
            trendingLoading={trendingLoading}
            trendingError={trendingError}
            searchResults={searchResults}
            searchLoading={searchLoading}
            searchError={searchError}
            onItemClick={(item) => {
              const title = item.title || item.name || "Untitled";
              const type = item.media_type === "tv" ? "tv" : "movie";
              const params = createSearchParams({
                query: title,
                type,
                page: "1",
              });
              navigate({ pathname: "/search", search: params.toString() });
              setShowDropdown(false);
              setSearchText(title);
            }}
          />
        </ClickOutsideWrapper>
      )}
    </>
  );
};

export default SearchBar;

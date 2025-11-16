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
import { debounce } from "../../utils/debounce";
import ClickOutsideWrapper from "./ClickOutsideWrapper";
import { TMDB } from "../../services/tmdb";

const SearchBar = ({ headerSearchRef }) => {
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
  //loading tring 
  async function loadTrending() {
    setTrendingLoading(true);
    try {
      const data = await TMDB.getTrendingAllDay();
      setTrending(data.results || []);
    } catch {
      setTrendingError(true);
    } finally {
      setTrendingLoading(false);
    }
  }
  useEffect(() => {
    loadTrending();
  }, []);

  const performSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) return setSearchResults([]);

      setSearchLoading(true);

      try {
        const data = await TMDB.searchMulti(query);
        setSearchResults(data.results || []);
      } catch {
        setSearchError(true);
      } finally {
        setSearchLoading(false);
      }
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
            <NavIcons src={searchDark} height={20} alt="Search" marginL="0" />
          </button>
          <SearchInput
            ref={(searchInputRef, headerSearchRef)}
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

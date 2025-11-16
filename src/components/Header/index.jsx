import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Menu, X, User, TrendingUp, Loader2 } from "lucide-react";
import logo from "../../assets/headerLogo.svg";
import footerLogo from "../../assets/footer-logo.svg";
import searchBlue from "../../assets/search-blue.svg";
import searchDark from "../../assets/search-dark.svg";
import plus from "../../assets/plus.svg";
import up from "../../assets/up.svg";
import {
  HeaderContainer,
  ContentWrapper,
  Navbar,
  NavLeft,
  NavLogo,
  NavLinks,
  NavItem,
  NavRight,
  NavIcons,
  NavLang,
  NavLink,
  SearchBarContainer,
  SearchWrapper,
  SearchInput,
  MobileNavBar,
  MobileMenuOverlay,
  MobileMenuPanel,
  MobileNavItem,
  SearchTrending,
  SearchTrendingWrapper,
  SearchTrendingHeader,
  TrendingList,
  TrendingItem,
  TrendingItemContent,
} from "./Header.styles";
import { API_KEY } from "../../request";

// ============ Custom Debounce (No lodash) ============
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const Header = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Trending (when input empty)
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingError, setTrendingError] = useState(false);

  // Live search (when typing)
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // ====================== FETCH TRENDING (once on mount) ======================
  useEffect(() => {
    const fetchTrending = async () => {
      if (!API_KEY) {
        setTrendingError(true);
        setTrendingLoading(false);
        return;
      }
      try {
        setTrendingLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTrending(data.results || []);
      } catch (e) {
        setTrendingError(true);
        console.error("Trending fetch error:", e);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  // ====================== DEBOUNCED LIVE SEARCH (No lodash) ======================
  const performSearch = useCallback(
    debounce((query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }
      if (!API_KEY) {
        setSearchError(true);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);
      setSearchError(false);

      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=1`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setSearchResults(data.results || []);
        })
        .catch((e) => {
          console.error("Search error:", e);
          setSearchError(true);
        })
        .finally(() => {
          setSearchLoading(false);
        });
    }, 300),
    [API_KEY]
  );

  // Trigger search when text changes
  useEffect(() => {
    performSearch(searchText);
  }, [searchText, performSearch]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (performSearch.cancel) {
        performSearch.cancel();
      }
    };
  }, [performSearch]);

  // ====================== HIDE NAV ON SCROLL ======================
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHideNav(current > lastScrollY && current > 80);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ====================== CLOSE DROPDOWN ON OUTSIDE CLICK ======================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showDropdown &&
        searchInputRef.current &&
        dropdownRef.current &&
        !searchInputRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // ====================== HANDLE SEARCH SUBMIT ======================
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.trim();
    if (!query) return;

    const params = createSearchParams({
      query,
      type: "multi",
      page: "1",
    });
    navigate({ pathname: "/search", search: params.toString() });
    setShowDropdown(false);
  };

  // ====================== HANDLE ITEM CLICK ======================
  const handleItemClick = (item) => {
    const title = item.title || item.name || "Untitled";
    const type = item.media_type === "tv" ? "tv" : "movie";
    setSearchText(title);
    const params = createSearchParams({ query: title, type, page: "1" });
    navigate({ pathname: "/search", search: params.toString() });
    setShowDropdown(false);
  };

  // ====================== DETERMINE WHAT TO SHOW ======================
  const isInputEmpty = !searchText.trim();
  const loading = isInputEmpty ? trendingLoading : searchLoading;
  const error = isInputEmpty ? trendingError : searchError;
  const items = isInputEmpty
    ? trending // Show ALL trending
    : searchResults.slice(0, 10); // Limit live search

  return (
    <HeaderContainer $hideNav={hideNav}>
      {/* ================== DESKTOP NAV ================== */}
      <Navbar>
        <ContentWrapper>
          <NavLeft>
            <NavLogo src={logo} alt="TMDB Logo" />
            <NavLinks>
              <NavItem>Movies</NavItem>
              <NavItem>TV Shows</NavItem>
              <NavItem>People</NavItem>
              <NavItem>More</NavItem>
            </NavLinks>
          </NavLeft>
          <NavRight>
            <NavIcons src={plus} height={22.4} alt="Add" />
            <NavLang href="#">en</NavLang>
            <NavLink href="#">Login</NavLink>
            <NavLink href="#">Join TMDB</NavLink>
            <NavIcons src={searchBlue} height={29.12} alt="Search" />
          </NavRight>
        </ContentWrapper>
      </Navbar>

      {/* ================== MOBILE NAV ================== */}
      <MobileNavBar>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <NavLogo src={footerLogo} height={36} alt="TMDB" />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <User size={24} />
          <img src={searchBlue} alt="Search" height={25} />
        </div>
      </MobileNavBar>

      {/* ================== MOBILE MENU PANEL ================== */}
      <MobileMenuOverlay open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileMenuPanel open={menuOpen}>
        <MobileNavItem>Movies</MobileNavItem>
        <MobileNavItem>TV Shows</MobileNavItem>
        <MobileNavItem>People</MobileNavItem>
        <MobileNavItem>More</MobileNavItem>
        <MobileNavItem>Login</MobileNavItem>
        <MobileNavItem>Join TMDB</MobileNavItem>
      </MobileMenuPanel>

      {/* ================== SEARCH BAR ================== */}
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

          {/* ====== LUCIDE: Spinner or Clear X ====== */}
          {searchLoading ? (
            <Loader2 size={18} className="lucide-spin" />
          ) : searchText.trim() ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => {
                setSearchText("");
                setShowDropdown(false);
                searchInputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : null}
        </SearchWrapper>
      </SearchBarContainer>

      {/* ================== DROPDOWN (Trending or Search) ================== */}
      {showDropdown && (
        <SearchTrending ref={dropdownRef}>
          <SearchTrendingWrapper>
            <SearchTrendingHeader>
              <img src={up} alt="trending" />
              <h3>{isInputEmpty ? "Trending" : "Search Results"}</h3>
            </SearchTrendingHeader>
          </SearchTrendingWrapper>

          <TrendingList>
            {loading ? (
              <TrendingItem>
                <TrendingItemContent>
                  <span style={{ color: "#666", fontStyle: "italic" }}>
                    Loading...
                  </span>
                </TrendingItemContent>
              </TrendingItem>
            ) : error ? (
              <TrendingItem>
                <TrendingItemContent>
                  <span style={{ color: "#e74c3c" }}>Failed to load</span>
                </TrendingItemContent>
              </TrendingItem>
            ) : items.length === 0 ? (
              <TrendingItem>
                <TrendingItemContent>
                  <span style={{ color: "#666" }}>No results</span>
                </TrendingItemContent>
              </TrendingItem>
            ) : (
              items.map((item) => {
                const title = item.title || item.name || "Untitled";
                return (
                  <TrendingItem
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                  >
                    <TrendingItemContent>
                      {isInputEmpty && <TrendingUp size={18} />}
                      <span>{title}</span>
                    </TrendingItemContent>
                  </TrendingItem>
                );
              })
            )}
          </TrendingList>
        </SearchTrending>
      )}
    </HeaderContainer>
  );
};

export default Header;

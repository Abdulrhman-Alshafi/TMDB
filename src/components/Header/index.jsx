import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

import logo from "../../assets/headerLogo.svg";
import footerLogo from "../../assets/footer-logo.svg";
import searchBlue from "../../assets/search-blue.svg";
import searchDark from "../../assets/search-dark.svg";
import plus from "../../assets/plus.svg";

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
} from "./Header.styles";

const Header = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // Hide header on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHideNav(current > lastScrollY && current > 80);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.trim();
    if (!query) return;

    // Navigate to search page with params
    const params = createSearchParams({
      query,
      type: "movie",
      page: "1",
    });

    navigate({
      pathname: "/search",
      search: params.toString(),
    });
    setMenuOpen(false); // Close mobile menu if open
  };

  return (
    <HeaderContainer hideNav={hideNav}>
      {/* ================== DESKTOP NAVBAR ================== */}
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

      {/* ================== MOBILE NAVBAR ================== */}
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

      {/* ================== MOBILE MENU DRAWER ================== */}
      <MobileMenuOverlay open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileMenuPanel open={menuOpen}>
        <MobileNavItem>Movies</MobileNavItem>
        <MobileNavItem>TV Shows</MobileNavItem>
        <MobileNavItem>People</MobileNavItem>
        <MobileNavItem>More</MobileNavItem>
        <MobileNavItem>Login</MobileNavItem>
        <MobileNavItem>Join TMDB</MobileNavItem>
      </MobileMenuPanel>

      {/* ================== GLOBAL SEARCH BAR ================== */}
      <SearchBarContainer>
        <SearchWrapper as="form" onSubmit={handleSearch}>
          {/* Search Icon Button */}
          <button
            type="submit"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Search"
          >
            <NavIcons src={searchDark} height={20} />
          </button>

          {/* Search Input */}
          <SearchInput
            type="text"
            placeholder="Search for a movie, tv show, person..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSearch(e);
              }
            }}
            aria-label="Search input"
          />
        </SearchWrapper>
      </SearchBarContainer>
    </HeaderContainer>
  );
};

export default Header;
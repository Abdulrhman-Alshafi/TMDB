import { useEffect, useState } from "react";
import logo from "../../assets/headerLogo.svg";
import footerLogo from "../../assets/footer-logo.svg";
import searchBlue from "../../assets/search-blue.svg";
import plus from "../../assets/plus.svg";
import searchDark from "../../assets/search-dark.svg";
import { Menu, X, User } from "lucide-react";

// Import styled components
import {
  HeaderContainer,
  ContentWrapper,
  Navbar,
  NavLeft,
  NavLang,
  NavIcons,
  NavLink,
  NavRight,
  NavLogo,
  NavLinks,
  NavItem,
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHideNav(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <HeaderContainer hideNav={hideNav}>
      {/* Desktop Navbar */}
      <Navbar>
        <ContentWrapper>
          <NavLeft>
            <NavLogo src={logo} />
            <NavLinks>
              <NavItem>Movies</NavItem>
              <NavItem>TV Shows</NavItem>
              <NavItem>People</NavItem>
              <NavItem>More</NavItem>
            </NavLinks>
          </NavLeft>

          <NavRight>
            <NavIcons src={plus} height={22.4} />
            <NavLang href="#">en</NavLang>
            <NavLink href="#">Login</NavLink>
            <NavLink href="#">Join TMDB</NavLink>
            <NavIcons src={searchBlue} height={29.12} />
          </NavRight>
        </ContentWrapper>
      </Navbar>

      {/* Mobile Navbar */}
      <MobileNavBar>
        <div onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        <NavLogo src={footerLogo} height={36} />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <User size={24} />
          <img src={searchBlue} alt="Search" height={25} />
        </div>
      </MobileNavBar>

      {/* Mobile Drawer + Overlay */}
      <MobileMenuOverlay open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileMenuPanel open={menuOpen}>
        <MobileNavItem>Movies</MobileNavItem>
        <MobileNavItem>TV Shows</MobileNavItem>
        <MobileNavItem>People</MobileNavItem>
        <MobileNavItem>More</MobileNavItem>
        <MobileNavItem>Login</MobileNavItem>
        <MobileNavItem>Join TMDB</MobileNavItem>
      </MobileMenuPanel>

      {/* Search Bar */}
      <SearchBarContainer>
        <SearchWrapper>
          <NavIcons src={searchDark} height={20} marginL={0} />
          <SearchInput placeholder="Search for a movie, tv show, person..." />
        </SearchWrapper>
      </SearchBarContainer>
    </HeaderContainer>
  );
};

export default Header;

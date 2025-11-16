import React, { useState } from "react";
import {
  MobileNavBar,
  MobileMenuOverlay,
  MobileMenuPanel,
  MobileNavItem,
  NavLogo,
} from "./Header.styles";
import { Menu, X, User } from "lucide-react";
import footerLogo from "../../assets/footer-logo.svg";
import searchBlue from "../../assets/search-blue.svg";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <MobileNavBar>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {menuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
        </button>
        <NavLogo
          src={footerLogo}
          height={36}
          alt="TMDB"
          onClick={() => {
            navigate("/");
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <User size={24} />
          <img src={searchBlue} alt="Search" height={25} />
        </div>
      </MobileNavBar>
      <MobileMenuOverlay open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileMenuPanel open={menuOpen}>
        <MobileNavItem>Movies</MobileNavItem>
        <MobileNavItem>TV Shows</MobileNavItem>
        <MobileNavItem>People</MobileNavItem>
        <MobileNavItem>More</MobileNavItem>
        <MobileNavItem>Login</MobileNavItem>
        <MobileNavItem>Join TMDB</MobileNavItem>
      </MobileMenuPanel>
    </>
  );
};

export default MobileNav;

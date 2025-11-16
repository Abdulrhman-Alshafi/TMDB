import React, { useState, useEffect } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";
import { HeaderContainer } from "./Header.styles";

const Header = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHideNav(current > lastScrollY && current > 80);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <HeaderContainer hideNav={hideNav}>
      <DesktopNav />
      <MobileNav />
      <SearchBar />
    </HeaderContainer>
  );
};

export default Header;

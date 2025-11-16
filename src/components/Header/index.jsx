import React, { useState, useEffect, useRef } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";
import { HeaderContainer } from "./Header.styles";

const Header = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const headerSearchRef = useRef(null); // ✅ new ref for header blue search icon

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
      <DesktopNav focusSearch={() => headerSearchRef.current?.focus()} />
      <MobileNav />
      <SearchBar headerSearchRef={headerSearchRef} /> {/* ✅ pass new ref */}
    </HeaderContainer>
  );
};

export default Header;

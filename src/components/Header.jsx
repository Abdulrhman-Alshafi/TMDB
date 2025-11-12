import { useEffect, useState } from "react";
import styled from "styled-components";

// ===== Styled Components =====
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  transform: ${({ hideNav }) =>
    hideNav ? "translateY(-50%)" : "translateY(0)"};
`;

const Navbar = styled.nav`
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled.li`
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: #38bdf8;
  }
`;

const SearchBarContainer = styled.div`
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 101;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 0.6rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 9999px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #38bdf8;
  }
`;

// ===== Component =====
const Header = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHideNav(true); // scroll down → hide navbar
      } else {
        setHideNav(false); // scroll up → show navbar
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <HeaderContainer hideNav={hideNav}>
        <Navbar>
          <NavLogo>MySite</NavLogo>
          <NavLinks>
            <NavItem>Home</NavItem>
            <NavItem>About</NavItem>
            <NavItem>Services</NavItem>
            <NavItem>Contact</NavItem>
          </NavLinks>
        </Navbar>
        <SearchBarContainer>
          <SearchInput placeholder="Search..." />
        </SearchBarContainer>
      </HeaderContainer>
    </>
  );
};
export default Header;

import styled from "styled-components";

// ===== Styled Components =====
export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transition: transform 0.3s ease;
  transform: ${({ hideNav }) =>
    hideNav ? "translateY(-60%)" : "translateY(0)"};
  
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  padding: 0 40px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Navbar = styled.nav`
  background-color: rgba(3, 37, 65);
  height: 64px;
  z-index: 50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavLang = styled.a`
  width: 28px;
  height: 26px;
  align-content: center;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 3px 5px;
  transition: linear 0.1s;
  color: #fff;
  font-weight: 600;
  font-size: 0.9em;
  text-transform: uppercase;
  margin-left: 30px;
  &:hover {
    color: rgba(3, 37, 65);
    background-color: #fff;
  }
`;

export const NavIcons = styled.img`
  height: ${(props) => props.height}px;
  margin-left: 30px;
  margin-left: ${(props) => props.marginL}px;
`;

export const NavLink = styled.a`
  margin-left: 30px;
  font-weight: 600;
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
    visibility: hidden;
  }
`;

export const NavLogo = styled.img`
  display: block;
  margin-right: 16px;
  width: 154px;
  height: ${(props) => props.height || 20}px;
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
`;

export const NavItem = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  margin-right: 15px;
  font-weight: 600;
`;

export const SearchBarContainer = styled.form`
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid rgba(227, 227, 227, 1);
  position: sticky;
  top: 0;
  height: 44px;
  display: flex;
  align-items: center;
  z-index: 101;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 0 40px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  max-width: 600px;
  border: none;
  font-size: 1rem;
  outline: none;
  font-family: Arial, sans-serif;
  font-style: italic;
  color: #acacac;
  margin-left: 10px;
`;

// ===== Mobile Elements =====
export const MobileNavBar = styled.div`
  display: none;
  background-color: rgba(3, 37, 65);
  height: 64px;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  @media (max-width: 900px) {
    display: flex;
  }
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  opacity: ${({ open }) => (open ? "1" : "0")};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s ease;
  z-index: 98;
`;

export const MobileMenuPanel = styled.div`
  position: fixed;
  top: 108px;
  left: 0;
  width: 90%;
  max-width: 320px;
  height: calc(100vh - 64px);
  background-color: rgba(3, 37, 65, 0.98);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
  z-index: 9009;
`;

export const MobileNavItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.1rem;
  font-weight: 500;
`;

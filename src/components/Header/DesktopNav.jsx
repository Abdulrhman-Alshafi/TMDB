import React from "react";
import {
  NavLeft,
  NavRight,
  NavLogo,
  NavLinks,
  NavItem,
  NavLang,
  NavLink,
  NavIcons,
  ContentWrapper,
  Navbar,
} from "./Header.styles";
import logo from "../../assets/headerLogo.svg";
import searchBlue from "../../assets/search-blue.svg";
import plus from "../../assets/plus.svg";
import { useNavigate } from "react-router-dom";

const DesktopNav = () => {
  const navigate = useNavigate();
  return (
    <Navbar>
      <ContentWrapper>
        <NavLeft>
          <NavLogo
            src={logo}
            alt="TMDB Logo"
            onClick={() => {
              navigate("/");
            }}
          />
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
  );
};

export default DesktopNav;

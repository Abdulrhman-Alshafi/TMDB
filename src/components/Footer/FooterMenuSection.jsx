import React from "react";
import {
  FooterMenu,
  FooterMenuTitle,
  FooterMenuList,
  FooterMenuLink,
} from "./Footer.styles";

const FooterMenuSection = ({ title, links }) => {
  return (
    <FooterMenu>
      <FooterMenuTitle>{title}</FooterMenuTitle>
      <FooterMenuList>
        {links.map((link, index) => (
          <FooterMenuLink key={index}>{link}</FooterMenuLink>
        ))}
      </FooterMenuList>
    </FooterMenu>
  );
};

export default FooterMenuSection;

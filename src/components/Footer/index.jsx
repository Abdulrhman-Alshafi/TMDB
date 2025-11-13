import React from "react";
import footerLogo from "../../assets/footer-logo.svg";
import {
  MainFooter,
  FooterContent,
  FooterLogoWrapper,
  FooterLogo,
  FooterJoin,
} from "./Footer.styles";
import FooterMenuSection from "./FooterMenuSection";

const Footer = () => {
  const menuData = [
    {
      id: 1,
      title: "The Basics",
      links: [
        "About TMDB",
        "Contact Us",
        "API Documentation",
        "API for Business",
        "System Status",
      ],
    },
    {
      id: 2,
      title: "Get Involved",
      links: ["Contribution Bible", "Add New Movie", "Add New TV Show"],
    },
    {
      id: 3,
      title: "Community",
      links: ["Guidelines", "Discussions", "Leaderboard", "Support Forums"],
    },
    {
      id: 4,
      title: "Legal",
      links: [
        "Terms of Use",
        "API Terms of Use",
        "Privacy Policy",
        "DMCA Policy",
      ],
    },
  ];

  return (
    <MainFooter>
      <FooterContent>
        <FooterLogoWrapper>
          <FooterLogo src={footerLogo} alt="Footer Logo" />
          <FooterJoin>Join the Community</FooterJoin>
        </FooterLogoWrapper>

        {menuData.map(({ id, title, links }) => (
          <FooterMenuSection key={id} title={title} links={links} />
        ))}
      </FooterContent>
    </MainFooter>
  );
};

export default Footer;

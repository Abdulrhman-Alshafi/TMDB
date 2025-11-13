import styled from "styled-components";

export const MainFooter = styled.footer`
  max-width: 100%;
  width: 100vw;
  background-image: radial-gradient(
    at 30% top,
    #031d33 0%,
    rgba(3, 37, 65, 1) 70%
  );
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding-top: 80px;
  padding-bottom: 98.8px;
  max-width: 888px;
  color: #fff;
  margin: auto;
  text-align: right;
  position: relative;
`;

export const FooterLogoWrapper = styled.div`
  text-align: right;
  position: relative;
  top: -36px;
`;

export const FooterLogo = styled.img`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 130px;
  height: auto;
`;

export const FooterJoin = styled.h2`
  position: relative;
  top: 140px;
  border: 2px solid #fff;
  background-color: #fff;
  color: rgba(1, 180, 228, 1);
  font-size: 19px;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 8px 16px;
`;

export const FooterMenu = styled.div``;

export const FooterMenuTitle = styled.h3`
  width: 100%;
  font-size: 20px;
  line-height: 29px;
  color: #fff;
  white-space: nowrap;
  text-align: start;
  text-transform: uppercase;
`;

export const FooterMenuList = styled.ul`
  width: 100%;
  text-align: start;
  font-size: 17.2px;
  list-style: none;
  padding: 0;
`;

export const FooterMenuLink = styled.li`
  line-height: 23.5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

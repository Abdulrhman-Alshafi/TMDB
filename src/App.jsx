import styled from "styled-components";

const CircularProgressWrapper = styled.div`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Svg = styled.svg`
  transform: rotate(-90deg);
`;

const Circle = styled.circle`
  fill: none;
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
`;

const CenterText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${({ size }) => size * 0.3}px;
  color: ${({ color }) => color};
`;

const CircularProgress = ({
  percent = 0,
  size = 80,
  strokeWidth = 8,
  trackColor = "#204529",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  let progressColor;
  if (percent < 50) progressColor = "#ff3b3b"; // red
  else if (percent < 75) progressColor = "#ffa500"; // orange
  else progressColor = "#21d07a"; // green

  return (
    <CircularProgressWrapper size={size}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </Svg>
      <CenterText size={size} color={progressColor}>
        {percent}%
      </CenterText>
    </CircularProgressWrapper>
  );
};
import React, { useState, useRef, useEffect } from "react";

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  border: 2px solid #ccc;
  border-radius: 20px;
  width: fit-content;
`;

const Button = styled.button`
  position: relative;
  background: none;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 1;
  color: ${({ active }) => (active ? "white" : "black")};
  transition: color 0.3s;
`;

const ActiveBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: #007bff;
  border-radius: 20px;
  z-index: 0;
  transition: all 0.3s ease;
`;

const LikeButtons = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgStyle, setBgStyle] = useState({});
  const buttonsRef = useRef([]);

  useEffect(() => {
    if (buttonsRef.current[activeIndex]) {
      const btn = buttonsRef.current[activeIndex];
      setBgStyle({
        width: btn.offsetWidth + "px",
        left: btn.offsetLeft + "px",
      });
    }
  }, [activeIndex]);

  return (
    <Container>
      <ActiveBg style={bgStyle} />
      {["Like", "Love", "Wow", "Haha"].map((label, index) => (
        <Button
          key={index}
          ref={(el) => (buttonsRef.current[index] = el)}
          active={activeIndex === index}
          onClick={() => setActiveIndex(index)}
        >
          {label}
        </Button>
      ))}
    </Container>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  background: #007bff;
  color: white;
  padding: 10px 0;
  transform: translateY(${({ visible }) => (visible ? "0%" : "-100%")});
  transition: transform 0.3s ease;
  z-index: 1000;
`;

const NavItem = styled.div`
  cursor: pointer;
`;

const SearchBar = styled.div`
  position: sticky;
  top: 0; /* always sticky below navbar */
  background: #f5f5f5;
  padding: 10px 20px;
  z-index: 999;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
`;

const Header = () => {
  const [prevScroll, setPrevScroll] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > prevScroll && currentScroll > 50) {
      setNavVisible(false); // scrolling down
    } else {
      setNavVisible(true); // scrolling up
    }
    setPrevScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return (
    <HeaderContainer>
      <Navbar visible={navVisible}>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Services</NavItem>
        <NavItem>Contact</NavItem>
      </Navbar>
      <SearchBar>
        <Input placeholder="Search..." />
      </SearchBar>
    </HeaderContainer>
  );
};

function App() {
  return (
    <>
      <Header />
      <main style={{ height: "100vh" }}></main>{" "}
      <CircularProgress percent={70} size={100} />
      <LikeButtons />
    </>
  );
}

export default App;

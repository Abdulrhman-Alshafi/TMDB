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
  padding: 10px;
`;

const Button = styled.button`
  position: relative;
  background: none;
  border: 2px solid #ccc;
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

function App() {
  return (
    <>
      <CircularProgress percent={70} size={100} />
      <LikeButtons />
    </>
  );
}

export default App;

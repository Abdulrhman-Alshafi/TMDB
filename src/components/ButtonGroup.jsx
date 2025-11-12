import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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

const ButtonGroup = () => {
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
export default ButtonGroup;

import { useEffect, useRef, useState } from "react";
import { Container, Button, ActiveBg } from "./ButtonGroup.styles";

const ButtonGroup = ({ btns, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgStyle, setBgStyle] = useState({});
  const buttonsRef = useRef([]);

  useEffect(() => {
    if (buttonsRef.current[activeIndex]) {
      const btn = buttonsRef.current[activeIndex];
      setBgStyle({
        width: `${btn.offsetWidth}px`,
        left: `${btn.offsetLeft}px`,
      });
    }
  }, [activeIndex, btns]);

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onChange) onChange(btns[index]);
  };

  return (
    <Container>
      <ActiveBg style={bgStyle} />
      {btns.map((label, index) => (
        <Button
          key={index}
          ref={(el) => (buttonsRef.current[index] = el)}
          active={activeIndex === index}
          onClick={() => handleClick(index)}
        >
          {label}
        </Button>
      ))}
    </Container>
  );
};

export default ButtonGroup;

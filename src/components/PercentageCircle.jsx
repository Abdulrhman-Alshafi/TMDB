import styled from "styled-components";

const PercentageCircleWrapper = styled.div`
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

const PercentageCircle = ({
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
    <PercentageCircleWrapper size={size}>
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
    </PercentageCircleWrapper>
  );
};
export default PercentageCircle;

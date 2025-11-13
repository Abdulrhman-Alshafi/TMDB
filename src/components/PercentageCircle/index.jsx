import styled from "styled-components";

const CircleWrapper = styled.div`
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: #081c22 2px solid;
  border-radius: 50%;
  background: conic-gradient(
    ${(props) => props.progressColor} ${(props) => props.percent * 3.6}deg,
    ${(props) => props.trackColor} 0deg
  );
`;

const InnerCircle = styled.div`
  width: 30px; /* size - 2 * strokeWidth */
  height: 30px;
  background-color: #081c22; /* background color of the inner circle */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterText = styled.span`
  font-weight: bold;
  color: #fff;
  font-size: 15px;
  display: flex;
  align-items: start;
  span {
    font-size: 6px;
    margin-top: 3px;
  }
`;

const PercentageCircle = ({ percent = 0, trackColor = "#204529" }) => {
  let progressColor;
  if (percent === 0)
    progressColor = "#081c22"; // same as background, won't show progress
  else if (percent < 50) progressColor = "#ff3b3b"; // red
  else if (percent < 70) progressColor = "#ffa500"; // orange
  else progressColor = "#21d07a"; // green

  return (
    <CircleWrapper
      percent={percent}
      progressColor={progressColor}
      trackColor={trackColor}
    >
      <InnerCircle>
        <CenterText color={progressColor}>
          {percent === 0 ? "NR" : percent}
          {percent !== 0 && <span>%</span>}
        </CenterText>
      </InnerCircle>
    </CircleWrapper>
  );
};

export default PercentageCircle;

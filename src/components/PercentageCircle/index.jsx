import React from "react";
import { CircleWrapper, InnerCircle, CenterText } from "./PercentageCircle.styles";

const PercentageCircle = ({ percent = 0, trackColor = "#204529" }) => {
  let progressColor;

  if (percent === 0) progressColor = "#081c22";
  else if (percent < 50) progressColor = "#ff3b3b";
  else if (percent < 70) progressColor = "#ffa500";
  else progressColor = "#21d07a";

  return (
    <CircleWrapper
      percent={percent}
      progressColor={progressColor}
      trackColor={trackColor}
    >
      <InnerCircle>
        <CenterText>
          {percent === 0 ? "NR" : percent}
          {percent !== 0 && <span>%</span>}
        </CenterText>
      </InnerCircle>
    </CircleWrapper>
  );
};

export default PercentageCircle;

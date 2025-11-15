import styled from "styled-components";

export const CircleWrapper = styled.div`
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

export const InnerCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: #081c22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenterText = styled.span`
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

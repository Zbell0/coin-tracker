import styled from "styled-components";
import React from "react";

interface containerProps {
  bgColor: string;
}

const Container = styled.div<containerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor}></Container>;
}

export default Circle;

import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(p) => p.theme.textColor};
`;

function App() {
  return (
    <Container>
      <H1>Hi</H1>
    </Container>
  );
}

export default App;

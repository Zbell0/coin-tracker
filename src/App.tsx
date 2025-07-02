import React from "react";
import styled from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="teal"></Circle>
      <Circle text="I'm here" bgColor="tomato" borderColor="yellow"></Circle>
    </div>
  );
}

export default App;

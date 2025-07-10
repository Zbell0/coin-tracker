import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(p) => p.theme.accentColor};
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Coin() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const {
    state: { name },
  } = useLocation();
  console.log(name);

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
      </Header>
      {loading ? "Loading..." : null}
    </Container>
  );
}

export default Coin;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
const CoinList = styled.ul``;
const Coin = styled.li`
  color: ${(p) => p.theme.textColor};
  border: 1px solid #3d3d3c;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #30336b;
    color: ${(p) => p.theme.accentTextColor};
    cursor: pointer;
    a {
      display: block;
    }
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coin Tracker</Title>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Link to={`/${coin.id}`}>
              <Coin key={coin.id}>{coin.name}</Coin>
            </Link>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

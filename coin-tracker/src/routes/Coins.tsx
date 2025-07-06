import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 10px;
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

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coin Tracker</Title>
      </Header>
      <CoinList>
        {coins.map((coin) => (
          <Link to={`/${coin.id}`}>
            <Coin key={coin.id}>{coin.name}</Coin>
          </Link>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;

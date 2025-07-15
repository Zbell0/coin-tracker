import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1e1e1e;
  color: #f5f5f5;
`;
const Title = styled.h1`
  font-size: 3rem;
  color: ${(p) => p.theme.accentColor};
  font-weight: 700;
  text-align: center;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #444;
  margin-bottom: 20px;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  color: ${(p) => p.theme.textColor};
  border: 1px solid #3d3d3c;
  border-radius: 15px;
  margin-bottom: 15px;
  background-color: #2c2c2c;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  a {
    color: ${(p) => p.theme.textColor};
    display: flex;
    align-items: center;
    padding: 20px;
    text-decoration: none;
  }

  &:hover {
    background-color: #3a3a3a;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    a {
      color: ${(p) => p.theme.accentTextColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #fff;
  padding: 3px;
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
  const { isLoading, data } = useQuery<CoinInterface[]>(
    ["allCoins"],
    fetchCoins
  );
  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header>
        <Title>Coin Tracker</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                ></Img>
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

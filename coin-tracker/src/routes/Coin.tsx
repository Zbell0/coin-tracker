import { use, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { theme } from "../theme";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchInfoData, fetchPriceData } from "./api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1e1e1e;
  padding: 15px 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 6px;
    color: #aaa;
  }

  span:last-child {
    font-size: 1rem;
    font-weight: 600;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
`;
const Loading = styled.div`
  font-size: 2rem;
  margin: 40px 0;
  text-align: center;
  color: #999;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #1e1e1e;
  gap: 10px;
  padding: 15px 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;
const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: ${(p) => (p.isActive ? p.theme.accentColor : p.theme.textColor)};

  transition: all 0.3s ease;

  a {
    color: inherit;
    text-decoration: none;
    display: block;
  }

  &:hover {
    background-color: ${(p) => p.theme.accentColor};
    color: #fff;
    a {
      color: #fff;
    }
  }
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: object;
}

function Coin() {
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/Price");
  const chartMatch = useMatch("/:coinId/Chart");
  if (!coinId) return <div>Invalid coin ID</div>;
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchInfoData(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchPriceData(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {infoData?.name
            ? infoData.name
            : loading
            ? "Loading.."
            : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {infoData?.name
            ? infoData.name
            : loading
            ? "Loading.."
            : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{tickersData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>
                {tickersData &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  }).format(tickersData.quotes.USD.price)}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total spply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`Price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`Chart`}>Chart</Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  );
}

export default Coin;

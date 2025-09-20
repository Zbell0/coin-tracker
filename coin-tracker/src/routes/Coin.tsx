import { useEffect, useState } from "react";
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
  position: relative;
`;

const HomeButton = styled(Link)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.accentColor};
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${(props) => props.theme.accentColor}dd;
    transform: translateY(-50%) scale(1.05);
  }

  &:before {
    content: "←";
    font-size: 1.2rem;
  }
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
const Description = styled.div`
  margin: 20px 0px;
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;

  p {
    margin: 0;
  }
`;

const DescriptionText = styled.p<{ isExpanded: boolean }>`
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isExpanded ? "unset" : "3")};
  -webkit-box-orient: vertical;
  line-height: 1.6;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 8px;
  padding: 0;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
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
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const stripHtmlTags = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

function Coin() {
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/Price");
  const chartMatch = useMatch("/:coinId/Chart");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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
        <HomeButton to="/">Home</HomeButton>
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
          <Description>
            {infoData?.description && (
              <>
                <DescriptionText isExpanded={isDescriptionExpanded}>
                  {stripHtmlTags(infoData.description)}
                </DescriptionText>
                {!isDescriptionExpanded && (
                  <ReadMoreButton
                    onClick={() => setIsDescriptionExpanded(true)}
                  >
                    Read more
                  </ReadMoreButton>
                )}
                {isDescriptionExpanded && (
                  <ReadMoreButton
                    onClick={() => setIsDescriptionExpanded(false)}
                  >
                    Show less
                  </ReadMoreButton>
                )}
              </>
            )}
          </Description>
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

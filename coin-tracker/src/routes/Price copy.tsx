import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory, fetchPriceData } from "./api";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  height: auto;
  padding: 20px 30px;
  background-color: #1e1e2f;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;

  span:last-child {
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-top: 6px;
    color: #aaa;
  }
`;

const Price = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Percentage = styled.span<{ isPositive: boolean }>`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => (props.isPositive ? "#4caf50" : "#f44336")};
`;

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
interface IHistorycalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { coinId } = useParams();
  if (!coinId) return <div>Invalid coin ID</div>;
  const { isLoading, data } = useQuery<IPriceData>(["tickers", coinId], () =>
    fetchPriceData(coinId)
  );
  const { isLoading: infoLoading, data: infoData } = useQuery<
    IHistorycalData[]
  >(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <Container>
          <Price>
            {data &&
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              }).format(data.quotes.USD.price)}
          </Price>
          {typeof data?.quotes.USD.percent_change_30m === "number" && (
            <Percentage isPositive={data.quotes.USD.percent_change_30m >= 0}>
              {data.quotes.USD.percent_change_30m}%
            </Percentage>
          )}
          <ReactApexChart
            type="area"
            series={[
              {
                name: "Price",
                data: infoData
                  ? infoData.map((item) => ({
                      x: new Date(item.time_close).getTime(),
                      y: item.close,
                    }))
                  : [],
              },
            ]}
            options={{
              chart: {
                height: 150,
                width: 320,
                toolbar: { show: false },
                sparkline: { enabled: true },
                background: "transparent",
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              fill: {
                type: "gradient",
                gradient: {
                  shade: "dark",
                  type: "vertical",
                  gradientToColors: ["#4caf50"],
                  opacityFrom: 0.4,
                  opacityTo: 0,
                  stops: [0, 100],
                },
              },
              colors: ["#4caf50"],
              grid: { show: false },
              theme: { mode: "dark" },
              yaxis: { show: false },
              xaxis: {
                type: "datetime",
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
              },
              tooltip: {
                y: {
                  formatter: (v) =>
                    `$${v.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`,
                },
              },
            }}
          />
          <span>Last updated : 30min ago</span>
        </Container>
      )}
    </div>
  );
}

export default Chart;

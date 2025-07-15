import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ReactApexChart from "react-apexcharts";
import Price from "./Price";

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
  const { isLoading, data } = useQuery<IHistorycalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data:
                data?.map((price) => ({
                  x: new Date(Number(price.time_close) * 1000),
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            theme: {
              mode: "dark",
            },

            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#7edb9d",
                  downward: "#ef5350",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
            tooltip: {
              shared: true,
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const [o, h, l, c] =
                  w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
                return `
                  <div style="padding: 8px; color: white;">
                    <strong>Open:</strong> $${o}<br/>
                    <strong>High:</strong> $${h}<br/>
                    <strong>Low:</strong> $${l}<br/>
                    <strong>Close:</strong> $${c}
                  </div>
                `;
              },
            },
          }}
        ></ReactApexChart>
      )}
    </div>
  );
}

export default Chart;

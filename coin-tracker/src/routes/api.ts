import { useParams } from "react-router-dom";
import Coins from "./Coins";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json;
}

export async function fetchInfoData(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  const json = response.json();
  return json;
}

export async function fetchPriceData(coinId: string) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  const json = response.json();
  return json;
}

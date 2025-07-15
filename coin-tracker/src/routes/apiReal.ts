// import { useParams } from "react-router-dom";
// import Coins from "./Coins";

// const BASE_URL = `https://api.coinpaprika.com/v1`;

// export async function fetchCoins() {
//   return [
//     {
//       id: "btc-bitcoin",
//       name: "Bitcoin",
//       symbol: "BTC",
//       rank: 1,
//       is_new: false,
//       is_active: true,
//       type: "coin",
//     },
//     {
//       id: "eth-ethereum",
//       name: "Ethereum",
//       symbol: "ETH",
//       rank: 2,
//       is_new: false,
//       is_active: true,
//       type: "coin",
//     },
//   ];
// }

// export async function fetchInfoData(coinId: string) {
//   return {
//     id: coinId,
//     name: "Bitcoin",
//     symbol: "BTC",
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//     logo: "",
//     description: "Mock description for testing",
//     message: "",
//     open_source: true,
//     started_at: "2009-01-03",
//     development_status: "Active",
//     hardware_wallet: true,
//     proof_type: "PoW",
//     org_structure: "Decentralized",
//     hash_algorithm: "SHA-256",
//     first_data_at: "2010-07-17",
//     last_data_at: "2025-07-14",
//   };
// }

// export async function fetchPriceData(coinId: string) {
//   return {
//     id: coinId,
//     name: "Bitcoin",
//     symbol: "BTC",
//     rank: 1,
//     total_supply: 21000000,
//     max_supply: 21000000,
//     beta_value: 1.2,
//     first_data_at: "2010-07-17",
//     last_updated: new Date().toISOString(),
//     quotes: {
//       USD: {
//         price: 12345.67,
//         volume_24h: 123456789,
//         volume_24h_change_24h: 2.5,
//         market_cap: 2345678901,
//         market_cap_change_24h: 1.2,
//         percent_change_15m: 0.1,
//         percent_change_30m: 0.5,
//         percent_change_1h: 1.0,
//         percent_change_6h: 2.1,
//         percent_change_12h: 3.2,
//         percent_change_24h: 4.3,
//         percent_change_7d: 5.4,
//         percent_change_30d: 6.5,
//         percent_change_1y: 20.0,
//         ath_price: 69000,
//         ath_date: "2021-11-10T00:00:00Z",
//         percent_from_price_ath: -82.1,
//       },
//     },
//   };
// }

// export async function fetchCoinHistory(coinId?: string) {
//   const now = Date.now();
//   return Array.from({ length: 10 }, (_, i) => {
//     const t = now - i * 3600 * 1000;
//     return {
//       time_open: new Date(t - 1800 * 1000).toISOString(),
//       time_close: new Date(t).toISOString(),
//       open: 12000 + i * 10,
//       high: 12100 + i * 10,
//       low: 11900 + i * 10,
//       close: 12050 + i * 10,
//       volume: 1000000 + i * 1000,
//       market_cap: 200000000 + i * 1000000,
//     };
//   }).reverse();
// }

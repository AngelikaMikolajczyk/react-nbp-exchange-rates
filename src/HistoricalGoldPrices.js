import React from "react";
import { format, sub } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { priceFormatter } from "./priceFormatter";
import axios from "axios";

function GoldPricesTableRow(props) {
  return (
    <tr>
      <td className="center">{props.date}</td>
      <td className="center">{props.price}</td>
    </tr>
  );
}

const today = new Date();
const formattedToday = format(today, "yyyy-MM-dd");
const oneMonthAgo = format(sub(today, { months: 1 }), "yyyy-MM-dd");

const endpointGoldPrices =
  "https://api.nbp.pl/api/cenyzlota/last/10/?format=json";

const endpointHistoricalGoldPrices = `https://api.nbp.pl/api/cenyzlota/${oneMonthAgo}/${formattedToday}/?format=json`;

export function HistoricalGoldPrices() {
  const [goldPrices, setGoldPrices] = React.useState([]);

  const [historicalGoldPrices, setHistoricalGoldPrices] = React.useState([]);

  // fetching gold prices for last 10 stock quotes
  React.useEffect(() => {
    async function fetchGoldPrices() {
      let {data: goldPricesData} = await axios.get(endpointGoldPrices);

      setGoldPrices(goldPricesData);
    }

    fetchGoldPrices();
  }, []);

  // feetching gold frices for last one month
  React.useEffect(() => {
    async function fetchHistoricalGoldPrices() {
      let {data: historicalGoldPricesData} = await axios.get(endpointHistoricalGoldPrices);
      
      setHistoricalGoldPrices(historicalGoldPricesData);
    }
    fetchHistoricalGoldPrices();
  }, []);

  return (
    <div className="goldPricesContainer">
      <h1>Ceny złota</h1>
      <div className="goldPricesTableDiv">
        <h2>Ceny złota z ostatnich 10 notowań</h2>
        <table className="goldPricesTable">
          <thead>
            <tr>
              <th className="center">Data</th>
              <th className="center">Cena</th>
            </tr>
          </thead>
          <tbody>
            {goldPrices.map((goldPrice, index) => {
              return (
                <GoldPricesTableRow
                  key={index}
                  date={goldPrice.data}
                  price={priceFormatter.format(goldPrice.cena)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="historicalyGoldPricesDiv">
        <h2>Historyczne ceny złota - wykres</h2>
        <div className="goldPricesChart">
          <ResponsiveContainer
            width={"80%"}
            height={300}
            className="goldPricesChartContainer"
          >
            <AreaChart
              data={historicalGoldPrices}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#ff8c1a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff8c1a" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="data"
                tick={{ fontSize: 18, fill: "#8c8c8c" }}
                axisLine={{ stroke: "#ff8c1a" }}
                tickLine={{ stroke: "#ff8c1a" }}
              />
              <YAxis
                dataKey="cena"
                domain={["dataMin", "auto"]}
                unit="PLN"
                width={70}
                tick={{ fontSize: 18, fill: "#8c8c8c" }}
                axisLine={{ stroke: "#8c8c8c" }}
                tickLine={{ stroke: "#8c8c8c" }}
              />
              <Tooltip
                formatter={(value) => [priceFormatter.format(value), "cena"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 217, 179, 0.7)",
                  border: "1px solid #cc6600",
                  color: "#cc6600"
                }}
                itemStyle={{ color: "#cc6600" }}
              />
              <Area
                type="monotone"
                dataKey="cena"
                stroke="#ff8c1a"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

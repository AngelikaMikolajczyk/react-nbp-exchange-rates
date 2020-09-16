import React from "react";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { format, sub } from "date-fns";
import { exchangeFormatter } from "./exchangeFormatter";
import { FlagAngCurrenciesPair } from "./FlagAngCurrenciesPair";

export function ExchangeForCurrency() {
  // current currency choosed by user
  const { currency } = useParams();

  // dates needed for api request
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");
  const oneMonthAgo = format(sub(today, { months: 1 }), "yyyy-MM-dd");
  const threeMonthsAgo = format(sub(today, { days: 93 }), "yyyy-MM-dd");

  const [exchangesForCurrency, setExchangesForCurrency] = React.useState({
    bid: 0.0,
    ask: 0.0,
    mid: 0.0
  });

  // historical mid rates for choosed currency
  const [
    historicalExchangesForCurrency,
    setHistoricalExchangesForCurrency
  ] = React.useState([]);

  const [currencyName, setCurrencyName] = React.useState("");

  const [midExchange, setMidExchange] = React.useState({
    date: today,
    mid: 0.0,
    error: null
  });

  const formattedPickedDate = format(midExchange.date, "yyyy-MM-dd");

  const endpointBidAndAskExchangeForCurrency = `https://api.nbp.pl/api/exchangerates/rates/c/${currency}/?format=json`;

  const endpointMidExchangeForCurrency = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/${oneMonthAgo}/${formattedToday}/?format=json`;

  const endpointMidExchangeForDate = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/${formattedPickedDate}/?format=json`;

  React.useEffect(() => {
    async function fetchBidAndAskAndMidExchangeForCurrency() {
      // fetching current bid and ask exchange rates for currency
      let responseBidAndAska = await fetch(
        endpointBidAndAskExchangeForCurrency
      );
      let dataBidAndAsk = await responseBidAndAska.json();
      let currencyBidAndAskExchange = dataBidAndAsk.rates[0];

      // fetching mid exchange rates for currency and full name of currency
      let responseMid = await fetch(endpointMidExchangeForCurrency);
      let dataMid = await responseMid.json();
      let currencyMidExchange = dataMid.rates[dataMid.rates.length - 1];
      setExchangesForCurrency({
        bid: currencyBidAndAskExchange.bid,
        ask: currencyBidAndAskExchange.ask,
        mid: currencyMidExchange.mid
      });
      let currencyFullName = dataBidAndAsk.currency;
      setCurrencyName(currencyFullName);

      let historicalMidExchanges = dataMid.rates;

      if (currency === "huf" || currency === "jpy") {
        historicalMidExchanges = historicalMidExchanges.map(
          (historicalExchange) => {
            return {
              ...historicalExchange,
              mid: historicalExchange.mid * 100
            };
          }
        );
      }

      setHistoricalExchangesForCurrency(historicalMidExchanges);
    }
    fetchBidAndAskAndMidExchangeForCurrency();
  }, [
    endpointBidAndAskExchangeForCurrency,
    endpointMidExchangeForCurrency,
    endpointMidExchangeForDate,
    currency
  ]);

  let isHufOrJpy = currency === "huf" || currency === "jpy";

  function handleExchangeForDateChange(event) {
    event.persist();

    setMidExchange((prevMidExchange) => {
      return {
        ...prevMidExchange,
        date: new Date(event.target.value)
      };
    });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    setMidExchange((prevMidExchange) => {
      return {
        ...prevMidExchange,
        error: null
      };
    });

    // fetching mid exchange rates for currency for picked date
    let responseMidForDate = await fetch(endpointMidExchangeForDate);

    if (responseMidForDate.ok) {
      let dataMidForDate = await responseMidForDate.json();
      let midExchangeForDate = dataMidForDate.rates[0];

      setMidExchange((prevMidExchange) => {
        return {
          ...prevMidExchange,
          mid: midExchangeForDate.mid
        };
      });
    } else {
      setMidExchange((prevMidExchange) => {
        return {
          ...prevMidExchange,
          error: "Brak danych"
        };
      });
    }
  }
  return (
    <div className="currencyExchangesContainer">
      <h1>
        {currency.toUpperCase()} - {currencyName}
      </h1>
      <div className="currentExchangeForCurrencyDiv">
        <h2>Aktualny kurs dla {currency.toUpperCase()}</h2>
        <div className="currentExchangeForCurrencyTableDiv">
          <table className="currentExchangeForCurrencyTable">
            <thead>
              <tr>
                <th>Waluta</th>
                <th className="currencyName">Nazwa</th>
                <th className="right">Kod waluty</th>
                <th className="right">Kupno</th>
                <th className="right">Sprzedaż</th>
                <th className="right">Kurs średni NBP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FlagAngCurrenciesPair
                    currencyIn={currency}
                    currencyOut={"PLN"}
                  />
                </td>
                <td className="currencyName">{currencyName}</td>
                <td className="right">
                  {isHufOrJpy ? "100" : "1"} {currency.toUpperCase()}
                </td>
                <td className="right">
                  {isHufOrJpy
                    ? exchangeFormatter.format(exchangesForCurrency.bid * 100)
                    : exchangeFormatter.format(exchangesForCurrency.bid)}
                </td>
                <td className="right">
                  {isHufOrJpy
                    ? exchangeFormatter.format(exchangesForCurrency.ask * 100)
                    : exchangeFormatter.format(exchangesForCurrency.ask)}
                </td>
                <td className="right">
                  {isHufOrJpy
                    ? exchangeFormatter.format(exchangesForCurrency.mid * 100)
                    : exchangeFormatter.format(exchangesForCurrency.mid)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="midExchangeForCurrencyForDateDiv">
        <h2>Średni kurs NBP dla {currency.toUpperCase()} na wybrany dzień</h2>
        <div className="midExchangeForCurrencyForDate">
          <form className="midExchangeForm" onSubmit={handleFormSubmit}>
            <FlagAngCurrenciesPair currencyIn={currency} currencyOut={"PLN"} />
            <div className="exchangeDate">
              {/* <label htmlFor="date">Data:</label> */}
              <input
                type="date"
                id="date"
                className="midExchangeInput"
                name="exchangeDate"
                value={formattedPickedDate}
                min={threeMonthsAgo}
                max={formattedToday}
                onChange={handleExchangeForDateChange}
              />
              {midExchange.error ? (
                <div className="errorMessage">{midExchange.error}</div>
              ) : null}
            </div>
            <div className="submitButtonDiv">
              <button type="submit" className="submitButton">
                Sprawdź kurs
              </button>
            </div>
            {midExchange.mid > 0 && midExchange.error === null ? (
              <div className="midExchangeDiv">
                <div className="currencySymbol">{isHufOrJpy ? "100" : "1"}</div>
                <div className="currencyIn">
                  {currency.toUpperCase()}
                </div> ={" "}
                <div className="midExchange">
                  {exchangeFormatter.format(midExchange.mid)}
                </div>
                <div className="currencyOut">PLN</div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
      <div className="exchangeForCurrencyChartDiv">
        <h2>Średni kurs NBP dla {currency.toUpperCase()} - wykres</h2>
        <div className="exchangeForCurrencyChart">
          <ResponsiveContainer
            width={"80%"}
            height={400}
            className="exchangeForCurrencyChartContainer"
          >
            <AreaChart
              data={historicalExchangesForCurrency}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#0066cc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0066cc" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="effectiveDate"
                tick={{ fontSize: 18, fill: "#8c8c8c" }}
                axisLine={{ stroke: "#0066cc" }}
                tickLine={{ stroke: "#0066cc" }}
              />
              <YAxis
                dataKey="mid"
                domain={["dataMin", "auto"]}
                width={70}
                tick={{ fontSize: 18, fill: "#8c8c8c" }}
                tickFormatter={(value) => exchangeFormatter.format(value)}
                axisLine={{ stroke: "#8c8c8c" }}
                tickLine={{ stroke: "#8c8c8c" }}
              />
              <Tooltip
                formatter={(value) => [
                  exchangeFormatter.format(value),
                  "średni kurs NBP"
                ]}
                contentStyle={{
                  backgroundColor: "rgba(128, 191, 255, 0.7)",
                  border: "1px solid #004080",
                  color: "#004080"
                }}
                itemStyle={{ color: "#004080" }}
              />
              <Area
                type="monotone"
                dataKey="mid"
                stroke="#0066cc"
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

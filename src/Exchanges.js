import React from "react";
import { useHistory } from "react-router-dom";
import { exchangeFormatter } from "./exchangeFormatter";
import { FlagAngCurrenciesPair } from "./FlagAngCurrenciesPair";
import axios from "axios";

function ExchangeTableRow({currencyIn, currencyOut, name, currencyCode, bid, ask}) {
  const history = useHistory();

  function handleOnClick() {
    history.push(`/rates/${currencyIn.toLowerCase()}`);
  }

  return (
    <tr onClick={handleOnClick} className="exchangeTableRow">
      <td>
        <FlagAngCurrenciesPair
          currencyIn={currencyIn}
          currencyOut={currencyOut}
        />
      </td>
      <td className="currencyName">{name}</td>
      <td className="right">{currencyCode}</td>
      <td className="right">{exchangeFormatter.format(bid)}</td>
      <td className="right">{exchangeFormatter.format(ask)}</td>
    </tr>
  );
}

const FULL_CURRENCY_CODES = [
  "EUR",
  "USD",
  "GBP",
  "CHF",
  "NOK",
  "SEK",
  "AUD",
  "CAD",
  "JPY",
  "CZK",
  "HUF",
  "DKK"
];

const ENDPOINT_CURRENCIES =
  "https://api.nbp.pl/api/exchangerates/tables/c/?format=json";

export function Exchanges() {
  const [exchangeRates, setExchangeRates] = React.useState({
    EUR: { bid: 0.0, ask: 0.0, name: "" },
    USD: { bid: 0.0, ask: 0.0, name: "" },
    GBP: { bid: 0.0, ask: 0.0, name: "" },
    CHF: { bid: 0.0, ask: 0.0, name: "" },
    NOK: { bid: 0.0, ask: 0.0, name: "" },
    SEK: { bid: 0.0, ask: 0.0, name: "" },
    AUD: { bid: 0.0, ask: 0.0, name: "" },
    CAD: { bid: 0.0, ask: 0.0, name: "" },
    JPY: { bid: 0.0, ask: 0.0, name: "" },
    CZK: { bid: 0.0, ask: 0.0, name: "" },
    HUF: { bid: 0.0, ask: 0.0, name: "" },
    DKK: { bid: 0.0, ask: 0.0, name: "" }
  });

  // fetching current bid, ask and mid exchange rates for each currency
  React.useEffect(() => {
    async function fetchExchangeRates() {
      let {data} = await axios.get(ENDPOINT_CURRENCIES);
      
      let exchangeRatesData = data[0].rates.reduce((acc, currentRate) => {
        if (FULL_CURRENCY_CODES.includes(currentRate.code)) {
          acc[currentRate.code] = {
            bid: currentRate.bid,
            ask: currentRate.ask,
            name: currentRate.currency
          };
        }
        return acc;
      }, {});
      setExchangeRates(exchangeRatesData);
    }
    fetchExchangeRates();
  }, []);

  return (
    <div className="exchangesContainer">
      <h1>Kursy walut</h1>
      <div className="exchangeTableDiv">
        <table className="exchangeTable">
          <thead>
            <tr>
              <th>Waluta</th>
              <th className="currencyName">Nazwa</th>
              <th className="right">Kod waluty</th>
              <th className="right">Kupno</th>
              <th className="right">Sprzedaż</th>
            </tr>
          </thead>
          <tbody>
            <ExchangeTableRow
              currencyIn="EUR"
              currencyOut="PLN"
              name={exchangeRates.EUR.name}
              currencyCode="1 EUR"
              bid={exchangeRates.EUR.bid}
              ask={exchangeRates.EUR.ask}
            />
            <ExchangeTableRow
              currencyIn="USD"
              currencyOut="PLN"
              name={exchangeRates.USD.name}
              currencyCode="1 USD"
              bid={exchangeRates.USD.bid}
              ask={exchangeRates.USD.ask}
            />
            <ExchangeTableRow
              currencyIn="GBP"
              currencyOut="PLN"
              name={exchangeRates.GBP.name}
              currencyCode="1 GBP"
              bid={exchangeRates.GBP.bid}
              ask={exchangeRates.GBP.ask}
            />
            <ExchangeTableRow
              currencyIn="CHF"
              currencyOut="PLN"
              name={exchangeRates.CHF.name}
              currencyCode="1 CHF"
              bid={exchangeRates.CHF.bid}
              ask={exchangeRates.CHF.ask}
            />
            <ExchangeTableRow
              currencyIn="NOK"
              currencyOut="PLN"
              name={exchangeRates.NOK.name}
              currencyCode="1 NOK"
              bid={exchangeRates.NOK.bid}
              ask={exchangeRates.NOK.ask}
            />
            <ExchangeTableRow
              currencyIn="SEK"
              currencyOut="PLN"
              name={exchangeRates.SEK.name}
              currencyCode="1 SEK"
              bid={exchangeRates.SEK.bid}
              ask={exchangeRates.SEK.ask}
            />
            <ExchangeTableRow
              currencyIn="AUD"
              currencyOut="PLN"
              name={exchangeRates.AUD.name}
              currencyCode="1 AUD"
              bid={exchangeRates.AUD.bid}
              ask={exchangeRates.AUD.ask}
            />
            <ExchangeTableRow
              currencyIn="CAD"
              currencyOut="PLN"
              name={exchangeRates.CAD.name}
              currencyCode="1 CAD"
              bid={exchangeRates.CAD.bid}
              ask={exchangeRates.CAD.ask}
            />
            <ExchangeTableRow
              currencyIn="JPY"
              currencyOut="PLN"
              name={exchangeRates.JPY.name}
              currencyCode="100 JPY"
              bid={exchangeRates.JPY.bid * 100}
              ask={exchangeRates.JPY.ask * 100}
            />
            <ExchangeTableRow
              currencyIn="CZK"
              currencyOut="PLN"
              name={exchangeRates.CZK.name}
              currencyCode="1 CZK"
              bid={exchangeRates.CZK.bid}
              ask={exchangeRates.CZK.ask}
            />
            <ExchangeTableRow
              currencyIn="HUF"
              currencyOut="PLN"
              name={exchangeRates.HUF.name}
              currencyCode="100 HUF"
              bid={exchangeRates.HUF.bid * 100}
              ask={exchangeRates.HUF.ask * 100}
            />
            <ExchangeTableRow
              currencyIn="DKK"
              currencyOut="PLN"
              name={exchangeRates.DKK.name}
              currencyCode="1 DKK"
              bid={exchangeRates.DKK.bid}
              ask={exchangeRates.DKK.ask}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

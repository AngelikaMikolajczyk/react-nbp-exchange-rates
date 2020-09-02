import React from "react";

function ExchangeTableRow(props) {
  return (
    <tr>
      <td>
        <img
          className="flag"
          src={`/icons/${props.currencyIn.toLowerCase()}.svg`}
          width="24"
          height="24"
          alt=""
        />
        {props.currencyIn}/{props.currencyOut}
      </td>
      <td>{props.name}</td>
      <td className="right">{props.currencyCode}</td>
      <td className="right">{props.bid}</td>
      <td className="right">{props.ask}</td>
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

  const endpointCurrencies =
    "https://api.nbp.pl/api/exchangerates/tables/c/?format=json";

  React.useEffect(() => {
    async function fetchExchangeRates() {
      let response = await fetch(endpointCurrencies);
      let data = await response.json();
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
              <th>Nazwa</th>
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
              bid={exchangeRates.EUR.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.EUR.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="USD"
              currencyOut="PLN"
              name={exchangeRates.USD.name}
              currencyCode="1 USD"
              bid={exchangeRates.USD.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.USD.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="GBP"
              currencyOut="PLN"
              name={exchangeRates.GBP.name}
              currencyCode="1 GBP"
              bid={exchangeRates.GBP.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.GBP.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="CHF"
              currencyOut="PLN"
              name={exchangeRates.CHF.name}
              currencyCode="1 CHF"
              bid={exchangeRates.CHF.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.CHF.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="NOK"
              currencyOut="PLN"
              name={exchangeRates.NOK.name}
              currencyCode="1 NOK"
              bid={exchangeRates.NOK.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.NOK.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="SEK"
              currencyOut="PLN"
              name={exchangeRates.SEK.name}
              currencyCode="1 SEK"
              bid={exchangeRates.SEK.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.SEK.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="AUD"
              currencyOut="PLN"
              name={exchangeRates.AUD.name}
              currencyCode="1 AUD"
              bid={exchangeRates.AUD.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.AUD.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="CAD"
              currencyOut="PLN"
              name={exchangeRates.CAD.name}
              currencyCode="1 CAD"
              bid={exchangeRates.CAD.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.CAD.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="JPY"
              currencyOut="PLN"
              name={exchangeRates.JPY.name}
              currencyCode="100 JPY"
              bid={(exchangeRates.JPY.bid * 100).toFixed(4).replace(".", ",")}
              ask={exchangeRates.JPY.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="CZK"
              currencyOut="PLN"
              name={exchangeRates.CZK.name}
              currencyCode="1 CZK"
              bid={exchangeRates.CZK.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.CZK.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="HUF"
              currencyOut="PLN"
              name={exchangeRates.HUF.name}
              currencyCode="100 HUF"
              bid={(exchangeRates.HUF.bid * 100).toFixed(4).replace(".", ",")}
              ask={exchangeRates.HUF.ask.toFixed(4).replace(".", ",")}
            />
            <ExchangeTableRow
              currencyIn="DKK"
              currencyOut="PLN"
              name={exchangeRates.DKK.name}
              currencyCode="1 DKK"
              bid={exchangeRates.DKK.bid.toFixed(4).replace(".", ",")}
              ask={exchangeRates.DKK.ask.toFixed(4).replace(".", ",")}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

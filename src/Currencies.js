import React from "react";
import { Link } from "react-router-dom";

function Currency(props) {
  return (
    <div className="currency">
      <div className="currencyData">
        <img
          className="flag"
          src={`/icons/${props.in.toLowerCase()}.svg`}
          width="24"
          height="24"
          alt=""
        />
        <div className="currencySymbol">
          <div className="currencyIn">{props.in}</div>/
          <div className="currencyOut">{props.out}</div>
        </div>
      </div>
      <div className="exchangeRates">
        <div className="exchange purchase">
          <p>Kupno</p>
          <p>{props.bid}</p>
        </div>
        <div className="exchange sale">
          <p>Sprzedaż</p>
          <p>{props.ask}</p>
        </div>
      </div>
    </div>
  );
}

const CURRENCY_CODES = ["EUR", "USD", "GBP", "CHF", "NOK", "SEK", "AUD", "CAD"];

export function Currencies() {
  const [exchangeRates, setExchangeRates] = React.useState({
    EUR: { bid: 0.0, ask: 0.0 },
    USD: { bid: 0.0, ask: 0.0 },
    GBP: { bid: 0.0, ask: 0.0 },
    CHF: { bid: 0.0, ask: 0.0 },
    NOK: { bid: 0.0, ask: 0.0 },
    SEK: { bid: 0.0, ask: 0.0 },
    AUD: { bid: 0.0, ask: 0.0 },
    CAD: { bid: 0.0, ask: 0.0 }
  });

  const endpointCurrencies =
    "https://api.nbp.pl/api/exchangerates/tables/c/?format=json";

  React.useEffect(() => {
    async function fetchExchangeRates() {
      let response = await fetch(endpointCurrencies);
      let data = await response.json();
      let exchangeRatesData = data[0].rates.reduce((acc, currentRate) => {
        if (CURRENCY_CODES.includes(currentRate.code)) {
          acc[currentRate.code] = {
            bid: currentRate.bid,
            ask: currentRate.ask
          };
        }
        return acc;
      }, {});
      setExchangeRates(exchangeRatesData);
    }
    fetchExchangeRates();
  }, []);

  return (
    <div className="containerCurrencies">
      <h1 className="title">Kursy najważniejszych walut</h1>
      <div className="currenciesGrid">
        <Currency
          in="EUR"
          out="PLN"
          bid={exchangeRates.EUR.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.EUR.ask.toFixed(4).replace(".", ",")}
        />
        <Currency
          in="USD"
          out="PLN"
          bid={exchangeRates.USD.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.USD.ask.toFixed(4).replace(".", ",")}
        />
        <Currency
          in="GBP"
          out="PLN"
          bid={exchangeRates.GBP.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.GBP.ask.toFixed(4).replace(".", ",")}
        />
        <Currency
          in="CHF"
          out="PLN"
          bid={exchangeRates.CHF.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.CHF.ask.toFixed(4).replace(".", ",")}
        />
        <Currency
          in="NOK"
          out="PLN"
          bid={exchangeRates.NOK.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.NOK.ask.toFixed(4).replace(".", ",")}
        />
        <Currency
          in="SEK"
          out="PLN"
          bid={exchangeRates.SEK.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.SEK.ask.toFixed(4).replace(".", ",")}
        />
        <Currency
          in="AUD"
          out="PLN"
          bid={exchangeRates.AUD.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.AUD.ask.toFixed(4).replace(".", ",")}
        />
        <Currency
          in="CAD"
          out="PLN"
          bid={exchangeRates.CAD.bid.toFixed(4).replace(".", ",")}
          ask={exchangeRates.CAD.ask.toFixed(4).replace(".", ",")}
        />
      </div>
      <div className="moreCurrencies">
        <Link to="/rates">Zobacz wszystkie kursy</Link>
      </div>
    </div>
  );
}

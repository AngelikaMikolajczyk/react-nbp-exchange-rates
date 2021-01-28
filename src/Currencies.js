import React from "react";
import { Link, useHistory } from "react-router-dom";
import { exchangeFormatter } from "./exchangeFormatter";
import { FlagAngCurrenciesPair } from "./FlagAngCurrenciesPair";
import axios from "axios";

function Currency({ in: inProp, out, bid, ask }) {
  // routing mechanism for each currency
  const history = useHistory();

  function handleOnClick() {
    history.push(`/rates/${inProp.toLowerCase()}`);
  }

  return (
    <div className="currency" onClick={handleOnClick}>
      <FlagAngCurrenciesPair currencyIn={inProp} currencyOut={out} />
      <div className="exchangeRates">
        <div className="exchange purchase">
          <p>Kupno</p>
          <p>{exchangeFormatter.format(bid)}</p>
        </div>
        <div className="exchange sale">
          <p>Sprzedaż</p>
          <p>{exchangeFormatter.format(ask)}</p>
        </div>
      </div>
    </div>
  );
}

const CURRENCY_CODES = ["EUR", "USD", "GBP", "CHF", "NOK", "SEK", "AUD", "CAD"];

const ENDPOINT_CURRENCIES =
  "https://api.nbp.pl/api/exchangerates/tables/c/?format=json";

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

  // fetching bid and ask rates for main currencies

  React.useEffect(() => {
    async function fetchExchangeRates() {

      let {data} = await axios.get(ENDPOINT_CURRENCIES);
      
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
          bid={exchangeRates.EUR.bid}
          ask={exchangeRates.EUR.ask}
        />
        <Currency
          in="USD"
          out="PLN"
          bid={exchangeRates.USD.bid}
          ask={exchangeRates.USD.ask}
        />
        <Currency
          in="GBP"
          out="PLN"
          bid={exchangeRates.GBP.bid}
          ask={exchangeRates.GBP.ask}
        />
        <Currency
          in="CHF"
          out="PLN"
          bid={exchangeRates.CHF.bid}
          ask={exchangeRates.CHF.ask}
        />
        <Currency
          in="NOK"
          out="PLN"
          bid={exchangeRates.NOK.bid}
          ask={exchangeRates.NOK.ask}
        />
        <Currency
          in="SEK"
          out="PLN"
          bid={exchangeRates.SEK.bid}
          ask={exchangeRates.SEK.ask}
        />
        <Currency
          in="AUD"
          out="PLN"
          bid={exchangeRates.AUD.bid}
          ask={exchangeRates.AUD.ask}
        />
        <Currency
          in="CAD"
          out="PLN"
          bid={exchangeRates.CAD.bid}
          ask={exchangeRates.CAD.ask}
        />
      </div>
      <div className="moreCurrencies">
        <Link to="/rates">Zobacz wszystkie kursy</Link>
      </div>
    </div>
  );
}

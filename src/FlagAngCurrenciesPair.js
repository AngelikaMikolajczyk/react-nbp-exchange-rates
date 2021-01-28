import React from "react";

export function FlagAngCurrenciesPair({currencyIn, currencyOut}) {
  return (
    <div className="currencyData">
      <img
        className="flag"
        src={`/icons/${currencyIn.toLowerCase()}.svg`}
        width="24"
        height="24"
        alt=""
      />
      <div className="currencySymbol">
        <div className="currencyIn">{currencyIn.toUpperCase()}</div>/
        <div className="currencyOut">{currencyOut.toUpperCase()}</div>
      </div>
    </div>
  );
}

import React from "react";

export function FlagAngCurrenciesPair(props) {
  return (
    <div className="currencyData">
      <img
        className="flag"
        src={`/icons/${props.currencyIn.toLowerCase()}.svg`}
        width="24"
        height="24"
        alt=""
      />
      <div className="currencySymbol">
        <div className="currencyIn">{props.currencyIn.toUpperCase()}</div>/
        <div className="currencyOut">{props.currencyOut.toUpperCase()}</div>
      </div>
    </div>
  );
}

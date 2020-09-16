import React from "react";
import { Menu } from "./Menu";
import { Currencies } from "./Currencies";
import { Gold } from "./Gold";
import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Exchanges } from "./Exchanges";
import { HistoricalGoldPrices } from "./HistoricalGoldPrices";
import { ExchangeForCurrency } from "./ExchangeForCurrency";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Switch>
          <Route path="/rates/:currency">
            <ExchangeForCurrency />
          </Route>
          <Route path="/rates">
            <Exchanges />
          </Route>
          <Route path="/gold">
            <HistoricalGoldPrices />
          </Route>
          <Route path="/">
            <Currencies />
            <Gold />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

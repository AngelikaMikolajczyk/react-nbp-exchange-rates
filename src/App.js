import React from "react";
import { Menu } from "./Menu";
import { Currencies } from "./Currencies";
import { Gold } from "./Gold";
import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Exchanges } from "./Exchanges";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Switch>
          <Route path="/rates">
            <Exchanges></Exchanges>
          </Route>
          <Route path="/gold">Ceny złota</Route>
          <Route path="/">
            <Currencies />
            <Gold />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

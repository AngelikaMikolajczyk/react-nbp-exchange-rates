import React from "react";
import { Link } from "react-router-dom";
import { priceFormatter } from "./priceFormatter";
import axios from "axios";

const ENDPOINT_GOLD = "https://api.nbp.pl/api/cenyzlota/?format=json";

export function Gold() {
  const [goldPrice, setGoldPrice] = React.useState("0");

  // fetching current gold price
  React.useEffect(() => {
    async function fetchGoldPrice() {
      let {data} = await axios.get(ENDPOINT_GOLD);
      
      setGoldPrice(data[0].cena);
    }
    fetchGoldPrice();
  }, []);

  return (
    <div className="gold">
      <h1 className="title">Aktualna cena złota</h1>
      <div className="goldData">
        <img
          className="gold_bar"
          src={`/icons/goldbar.svg`}
          width="30"
          height="30"
          alt=""
        />
        <div className="currentGoldPrice">
          {priceFormatter.format(goldPrice)} PLN
        </div>
      </div>
      <div className="note">
        (Cena wyliczona w NBP za 1g złota w próbie 1000)
      </div>
      <div className="moreGoldPrices">
        <Link to="/gold">Zobacz ceny archiwalne</Link>
      </div>
    </div>
  );
}

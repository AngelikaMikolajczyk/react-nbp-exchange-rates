import React from "react";
import { Link } from "react-router-dom";

export function Gold() {
  const [goldPrice, setGoldPrice] = React.useState("0");
  const endpointGold = "https://api.nbp.pl/api/cenyzlota/?format=json";

  React.useEffect(() => {
    async function fetchGoldPrice() {
      let response = await fetch(endpointGold);
      let data = await response.json();
      setGoldPrice(data[0].cena);
    }
    fetchGoldPrice();
  }, []);

  // const goldPricePromise = fetch(endpointGold)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     setGoldPrice(data[0].cena);
  //   });

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
          {goldPrice.toString().replace(".", ",")} PLN
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

import React from "react";
import { Link } from "react-router-dom";

function Category(props) {
  return (
    <div className="category">
      <Link to={props.link}>{props.name}</Link>
    </div>
  );
}

export function Menu() {
  return (
    <div className="containerMenu">
      <div className="menu">
        <div className="companyName">WALUTOWNIK</div>
        <div className="categories">
          <Category name="kursy walut" link="/rates" />
          <Category name="ceny złota" link="/gold" />
        </div>
      </div>
    </div>
  );
}

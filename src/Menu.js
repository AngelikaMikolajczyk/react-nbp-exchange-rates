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
  // dark/light theme mechanism

  const [theme, setTheme] = React.useState(() => {
    const themeFromLocalStorage = localStorage.getItem("theme");
    if (themeFromLocalStorage === null) {
      return "light";
    } else {
      return themeFromLocalStorage;
    }
  });

  function onChangeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  React.useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (theme === "light") {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
    } else {
      htmlElement.classList.remove("light");
      htmlElement.classList.add("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="containerMenu">
      <div className="menu">
        <div className="companyLogoAndNameLink">
          <Link to="/">
            <div className="companyLogoAndName">
              <div className="companyLogo">
                <img
                  className="logo"
                  src={`/icons/currency.svg`}
                  width="48"
                  height="48"
                  alt=""
                />
              </div>
              <div className="companyName">WALUTOWNIK</div>
            </div>
          </Link>
        </div>
        <div className="categories">
          <Category name="kursy walut" link="/rates" />
          <Category name="ceny złota" link="/gold" />
        </div>
        <div className="themeSwitchContainer">
          <label className="themeSwitch" htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              onChange={onChangeTheme}
              checked={theme === "light"}
            />
            <div className="slider round"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

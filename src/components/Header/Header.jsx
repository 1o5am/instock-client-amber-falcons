// import instockLogo from "../../assets/Logo/InStock-Logo.svg";
import instockLogo from "../../assets/logo/InStock-Logo_1x.png";

import { useLocation, Link } from "react-router-dom";
import "./Header.scss";

import React from "react";

function Header() {
  return (
    <header className="header">
      <section className="header__logo-box">
        <img
          className="header__logo-image"
          src={instockLogo}
          alt="instock logo"
        />
        <div className="header__link">
          <Link to="/">
            <h3 className="header__warehouses-link">Warehouses</h3>
          </Link>
          <Link to="/">
            <h3 className="header__inventory-link">Inventory</h3>
          </Link>
        </div>
      </section>
    </header>
  );
}

export default Header;

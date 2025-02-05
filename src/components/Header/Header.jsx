import instockLogo from "../../assets/logo/InStock-Logo.svg";
import { Link } from "react-router-dom";
import "./Header.scss";

import React from "react";

function Header({ page }) {
  return (
    <header className="header">
      <section className="header__logo-box">
        <Link className="header__link-logo" to="/warehouse">
          <img
            className="header__logo-image"
            src={instockLogo}
            alt="instock logo"
          />{" "}
        </Link>
        <div className="header__link-content">
          <Link
            to="/warehouse"
            className={`header__link ${
              page === "warehouse"
                ? "header__link--active"
                : "header__link--inactive"
            }`}
          >
            Warehouses
          </Link>
          <Link
            to="/inventory"
            className={`header__link ${
              page === "inventory"
                ? "header__link--active"
                : "header__link--inactive"
            }`}
          >
            Inventory
          </Link>
        </div>
      </section>
    </header>
  );
}

export default Header;

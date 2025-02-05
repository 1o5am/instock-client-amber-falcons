// import instockLogo from "../../assets/logo/InStock-Logo.svg";
import instockLogo from "../../assets/logo/InStock-Logo_1x.png";
import { useState, useEffect } from "react";

import { useLocation, Link, useParams } from "react-router-dom";
import "./Header.scss";

import React from "react";

function Header({ page }) {
  const { location } = useParams();

  return (
    <header className="header">
      <section className="header__logo-box">
        <img
          className="header__logo-image"
          src={instockLogo}
          alt="instock logo"
        />
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

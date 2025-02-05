import instockLogo from "../../assets/logo/InStock-Logo.svg";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <section className="header__logo-box">
        <p>test</p>
        <Link className="header__link-logo" to="/">
          <img
            className="header__logo-image"
            src={instockLogo}
            alt="instock logo"
          />
        </Link>
        <div className="header__link-content">
          <NavLink
            to="/warehouses"
            className={({ isActive }) =>
              `header__link ${
                isActive ? "header__link--active" : "header__link--inactive"
              }`
            }
          >
            Warehouses
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `header__link ${
                isActive ? "header__link--active" : "header__link--inactive"
              }`
            }
          >
            Inventory
          </NavLink>
        </div>
      </section>
    </header>
  );
}

export default Header;

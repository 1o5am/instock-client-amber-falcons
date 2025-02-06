import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowIcon from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import "./ListItem.scss";

function ListItem({ item, isWarehouse }) {
  return (
    <li className="item">
      <div className="item__info">
        <p className="item__title">INVENTORY ITEM</p>
        <Link to={`${item.id}`}>
          <p className="item__name item__name--bold item__name--blue text-link">
            {item.item_name} <img className="icon" src={arrowIcon}></img>
          </p>
        </Link>
      </div>
      <div className="item__info item__info--tablet">
        <p className="item__title">CATEGORY</p>
        <p className="item__name">{item.category}</p>
      </div>
      <div className="item__info">
        <p className="item__title">STATUS</p>
        <p
          className={`item__name item__name--bold item__name--bubble ${
            item.status === "In Stock" ? "item__name--green" : "item__name--red"
          }`}
        >
          {item.status.toUpperCase()}
        </p>
      </div>
      <div className="item__info item__info--mobile">
        <p className="item__title">CATEGORY</p>
        <p className="item__name">{item.category}</p>
      </div>
      <div className="item__info item__info--small">
        <p className="item__title">QTY</p>
        <p className="item__name">{item.quantity}</p>
      </div>
      {!isWarehouse && (
        <div className="item__info item__info--right">
          <p className="item__title">WAREHOUSE</p>
          <p className="item__name">{item.warehouse_name}</p>
        </div>
      )}
      <div className={`item__icons ${isWarehouse?"item__icons--warehouse":""}`}>
        <Link to={`delete/${item.id}`}>
          <img className="icon" src={deleteIcon}></img>
        </Link>
        <Link to={`edit/${item.id}`}>
          <img className="icon" src={editIcon}></img>
        </Link>
      </div>
    </li>
  );
}
export default ListItem;

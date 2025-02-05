import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowIcon from "../../assets/icons/chevron_right-24px.svg";
import "./InventoryListItem.scss";

function InventoryListItem({ item }) {
  return (
    <li className="inventory-item__item">
      <div className="inventory-item__info">
        <p className="inventory-item__title">INVENTORY ITEM</p>
        <p className="inventory-item__name inventory-item__name--blue">
          {item.item_name} <img src={arrowIcon}></img>
        </p>
      </div>
      <div className="inventory-item__info">
        <p className="inventory-item__title">CATEGORY</p>
        <p className="inventory-item__name">{item.category}</p>
      </div>
      <div className="inventory-item__info">
        <p className="inventory-item__title">STATUS</p>
        <p className="inventory-item__name">{item.status}</p>
      </div>
      <div className="inventory-item__info">
        <p className="inventory-item__title">QUANTITY</p>
        <p className="inventory-item__name">{item.quantity}</p>
      </div>
      <div className="inventory-item__info">
        <p className="inventory-item__title">WAREHOUSE</p>
        <p className="inventory-item__name">{item.warehouse_name}</p>
      </div>
      <div className="inventory-item__icons">
        <img className="icon" src={deleteIcon}></img>
        <img className="icon" src={editIcon}></img>
      </div>
    </li>
  );
}
export default InventoryListItem;

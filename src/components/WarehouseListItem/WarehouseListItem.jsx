import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowIcon from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import "./WarehouseListItem.scss";

const WarehouseListItem = ({ item }) => {
  return (
    <li className="warehouse-item">
      <div className="warehouse-item__info warehouse-item__info--col1">
        <p className="warehouse-item__title">WAREHOUSE</p>
        <Link to={`${item.id}`} className="warehouse-item__link">
          <p className="warehouse-item__name warehouse-item__name--bold warehouse-item__name--blue text-link">
            {item.warehouse_name} <img className="icon" src={arrowIcon}></img>
          </p>
        </Link>
      </div>
      <div className="warehouse-item__info warehouse-item__info--large warehouse-item__info--col3">
        <p className="warehouse-item__title">ADDRESS</p>
        <p className="warehouse-item__name">
          {item.address}, {item.city}, {item.country}
        </p>
      </div>
      <div className="warehouse-item__info warehouse-item__info--small warehouse-item__info--col2">
        <p className="warehouse-item__title">CONTACT NAME</p>
        <p className="warehouse-item__name">{item.contact_name}</p>
      </div>
      <div className="warehouse-item__info warehouse-item__info--medium warehouse-item__info--col4">
        <p className="warehouse-item__title">CONTACT INFORMATION</p>
        <p className="warehouse-item__name">{item.contact_phone}</p>
        <p className="warehouse-item__name">{item.contact_email}</p>
      </div>
      <div className="warehouse-item__icons">
        <Link to={`delete/${item.id}`}>
          <img className="icon" src={deleteIcon}></img>
        </Link>
        <Link to={`edit/${item.id}`}>
          <img className="icon" src={editIcon}></img>
        </Link>
      </div>
    </li>
  );
};
export default WarehouseListItem;

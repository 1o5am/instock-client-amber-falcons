import WarehouseForm from "../../components/WarehouseForm/WarehouseForm.jsx";
import "./AddNewWarehousePage.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

function AddNewWarehousePage() {
  return (
    <div className="page-content new-item-page">
      <div className="new-item-page__header">
        <Link to="/inventory">
          <img className="icon new-item-page__back" src={backArrow}></img>
        </Link>
        <h1 className="new-item-page__title">Add New Inventory Item</h1>
      </div>
      <WarehouseForm />
    </div>
  );
}

export default AddNewWarehousePage;

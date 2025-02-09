import WarehouseForm from "../../components/WarehouseForm/WarehouseForm.jsx";
import "./AddNewWarehousePage.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

function AddNewWarehousePage() {
  return (
    <div className="page-content new-warehouse-page">
      <div className="new-warehouse-page__header">
        <Link to="/warehouses">
          <img className="icon new-warehouse-page__back" src={backArrow}></img>
        </Link>
        <h1 className="new-warehouse-page__title">Add New Warehouse</h1>
      </div>
      <WarehouseForm />
    </div>
  );
}

export default AddNewWarehousePage;

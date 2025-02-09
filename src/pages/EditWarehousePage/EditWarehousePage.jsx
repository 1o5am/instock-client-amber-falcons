import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import "./EditWarehousePage.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link, useLocation } from "react-router-dom";

const EditWarehousePage = () => {
  const location = useLocation();
  const previousPage = location.state?.from || "/warehouses";

  return (
    <div className="page-content edit-warehouse-page">
      <div className="edit-warehouse-page__header">
        <Link to={previousPage}>
          <img
            className="icon edit-warehouse-page__back"
            src={backArrow}
            alt="Back"
          />
        </Link>
        <h1 className="edit-warehouse-page__title">Edit Warehouse</h1>
      </div>
      <WarehouseForm isEditing={true} />
    </div>
  );
};

export default EditWarehousePage;

import WarehouseContainer from "../../components/WarehouseContainer/WarehouseContainer";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./WarehousePage.scss";
import { useNavigate } from "react-router-dom";

const WarehousePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-content warehouse-page">
      <div className="warehouse-page__header">
        <h1 className="warehouse-page__title">Warehouses</h1>
        <div className="warehouse-page__buttons">
          <div className="warehouse-page__search">
            <Searchbar />
          </div>
          <button
            onClick={() => {
              navigate("/warehouses/add");
            }}
            className="btn btn--primary warehouse-page__add"
          >
            + Add New Warehouse
          </button>
        </div>
      </div>
      <WarehouseContainer />
    </div>
  );
};

export default WarehousePage;

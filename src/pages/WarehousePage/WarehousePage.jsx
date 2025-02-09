import WarehouseContainer from "../../components/WarehouseContainer/WarehouseContainer";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./WarehousePage.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const WarehousePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="page-content warehouse-page">
      <div className="warehouse-page__header">
        <h1 className="warehouse-page__title">Warehouses</h1>
        <div className="warehouse-page__buttons">
          <div className="warehouse-page__search">
            <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
      <WarehouseContainer searchTerm={searchTerm} />
    </div>
  );
};

export default WarehousePage;

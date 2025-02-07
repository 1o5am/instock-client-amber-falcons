import axios from "axios";
import { useEffect, useState } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./WarehousePage.scss";
import { useNavigate } from "react-router-dom";

const WarehousePage = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);

  async function getAllWarehouseItems() {
    const allWarehouseResponse = await axios.get(
      `http://localhost:8080/api/warehouses`
    );

    console.log("Warehouse", allWarehouseResponse.data);
    setWarehouses(allWarehouseResponse.data);
  }

  useEffect(() => {
    getAllWarehouseItems();
  }, []);

  const handleDelete = (deletedId) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== deletedId));
  };

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
              navigate("/warehouse/add");
            }}
            className="btn btn--primary warehouse-page__add"
          >
            + Add New Warehouse
          </button>
        </div>
      </div>

      <>
        {warehouses ? (
          <WarehouseList allItems={warehouses} onDelete={handleDelete} />
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default WarehousePage;

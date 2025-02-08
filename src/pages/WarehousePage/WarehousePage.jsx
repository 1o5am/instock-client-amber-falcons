import axios from "axios";
import { useEffect, useState } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./WarehousePage.scss";
import { useNavigate } from "react-router-dom";

const WarehousePage = () => {
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState([]);

  async function getAllWarehouseItems() {
    const allWarehouseResponse = await axios.get(
      `http://localhost:8080/api/warehouses`
    );

    console.log("Warehouse", allWarehouseResponse.data);
    setWarehouse(allWarehouseResponse.data);
  }

  useEffect(() => {
    getAllWarehouseItems();
  }, []);

  return (
    <div className="page-content warehouse-page">
      <div className="warehouse-page__header">
        <h1 className="warehouse-page__title">Warehouses</h1>
        <div className="warehouse-page__buttons">
          <Searchbar />
          <button
            onClick={() => {
              navigate("/warehouse/add");
            }}
            className="btn btn--primary warehouse-page__add"
          >
            + Add New Item
          </button>
        </div>
      </div>

      <>{warehouse ? <WarehouseList allItems={warehouse} /> : <></>}</>
    </div>
  );
};

export default WarehousePage;

import axios from "axios";
import { useEffect, useState } from "react";
import WarehouseTable from "../WarehouseTable/WarehouseTable";

const WarehouseContainer = () => {
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
    <>
      {warehouses ? (
        <WarehouseTable allItems={warehouses} onDelete={handleDelete} />
      ) : (
        <></>
      )}
    </>
  );
};

export default WarehouseContainer;

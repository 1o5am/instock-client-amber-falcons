import axios from "axios";
import { useEffect, useState } from "react";
import WarehouseList from "../WarehouseList/WarehouseList";

const WarehouseContainer = ({ searchTerm }) => {
  const [warehouses, setWarehouses] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  async function getAllWarehouseItems() {
    const allWarehouseResponse = await axios.get(
      `${baseURL}/warehouses?s=${searchTerm}`
    );

    console.log("Warehouse", allWarehouseResponse.data);
    setWarehouses(allWarehouseResponse.data);
  }

  useEffect(() => {
    getAllWarehouseItems();
  }, [searchTerm]);

  const handleDelete = (deletedId) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== deletedId));
  };

  return (
    <>
      {warehouses ? (
        <WarehouseList allItems={warehouses} onDelete={handleDelete} />
      ) : (
        <></>
      )}
    </>
  );
};

export default WarehouseContainer;

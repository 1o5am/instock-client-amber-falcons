import axios from "axios";
import { useEffect, useState } from "react";
import WarehouseList from "../WarehouseList/WarehouseList";

const WarehouseContainer = ({ searchTerm, sortField, sortOrder, onSort }) => {
  const [warehouses, setWarehouses] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getAllWarehouseItems() {
      try {
        const allWarehouseResponse = await axios.get(
          `${baseURL}/warehouses?s=${searchTerm}&sort_by=${sortField}&order_by=${sortOrder}`
        );

        setWarehouses(allWarehouseResponse.data);
      } catch (error) {
        console.error("Failed to fetch warehouses:", error);
      }
    }

    getAllWarehouseItems();
  }, [searchTerm, sortField, sortOrder]);

  const handleDelete = (deletedId) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== deletedId));
  };

  return (
    <>
      {warehouses ? (
        <WarehouseList
          allItems={warehouses}
          onDelete={handleDelete}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSort}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default WarehouseContainer;

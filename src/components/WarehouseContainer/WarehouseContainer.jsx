import axios from "axios";
import { useEffect, useState } from "react";
import WarehouseList from "../WarehouseList/WarehouseList";
import { BASE_URL } from "../../utils/utils.js";

const WarehouseContainer = ({ searchTerm }) => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function getAllWarehouseItems() {
      try {
        const allWarehouseResponse = await axios.get(
          `${BASE_URL}/warehouses?s=${searchTerm}`
        );

        setWarehouses(allWarehouseResponse.data);
      } catch (error) {
        console.error("Failed to fetch warehouses:", error);
      }
    }

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

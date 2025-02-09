import axios from "axios";
import { useEffect, useState } from "react";
import InventoryList from "../InventoryList/InventoryList";

function WarehouseInventoryContainer({ id }) {
  const [inventoryById, setInventoryById] = useState([]);
  const handleDelete = (deletedId) => {
    setInventoryById(inventoryById.filter((item) => item.id !== deletedId));
  };
  const baseURL = import.meta.env.VITE_API_URL;

  async function getAllInventoryItemsById() {
    try {
      const inventoryByIdResponse = await axios.get(
        `http://localhost:8080/api/warehouses/${id}/inventories`
      );

      setInventoryById(inventoryByIdResponse.data);
    } catch (error) {
      console.error("Error in fetching inventory by id", error);
    }
  }

  useEffect(() => {
    getAllInventoryItemsById();
  }, []);

  return (
    <>
      {inventoryById ? (
        <InventoryList
          allItems={inventoryById}
          isWarehouse={true}
          onDelete={handleDelete}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default WarehouseInventoryContainer;

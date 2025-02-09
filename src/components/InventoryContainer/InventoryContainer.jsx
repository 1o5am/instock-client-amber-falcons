import axios from "axios";
import { useEffect, useState } from "react";
import InventoryList from "../InventoryList/InventoryList";

function InventoryContainer({ searchTerm, sortField, sortOrder, onSort }) {
  const [inventory, setInventory] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getAllInventoryItems() {
      try {
        const allInventoryResponse = await axios.get(
          `${baseURL}/inventory?s=${searchTerm}&sort_by=${sortField}&order_by=${sortOrder}`
        );

        setInventory(allInventoryResponse.data);
      } catch (error) {
        console.error("Failed to fetch all inventories:", error);
      }
    }

    getAllInventoryItems();
  }, [searchTerm, sortField, sortOrder]);

  const handleDelete = (deletedId) => {
    setInventory(inventory.filter((item) => item.id !== deletedId));
  };

  return (
    <>
      {inventory ? (
        <InventoryList
          allItems={inventory}
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
}

export default InventoryContainer;

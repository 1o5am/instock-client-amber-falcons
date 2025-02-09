import axios from "axios";
import { useEffect, useState } from "react";
import InventoryList from "../InventoryList/InventoryList";

function InventoryContainer({ searchTerm }) {
  const [inventory, setInventory] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getAllInventoryItems() {
      try {
        const allInventoryResponse = await axios.get(
          `${baseURL}/api/inventory?s=${searchTerm}`
        );

        setInventory(allInventoryResponse.data);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    }

    getAllInventoryItems();
  }, [searchTerm, baseURL]);

  const handleDelete = (deletedId) => {
    setInventory(inventory.filter((item) => item.id !== deletedId));
  };

  return (
    <>
      {inventory ? (
        <InventoryList allItems={inventory} onDelete={handleDelete} />
      ) : (
        <></>
      )}
    </>
  );
}

export default InventoryContainer;

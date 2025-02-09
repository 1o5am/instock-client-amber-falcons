import axios from "axios";
import { useEffect, useState } from "react";
import InventoryList from "../InventoryList/InventoryList";
import { BASE_URL } from "../../utils/utils.js";

function InventoryContainer({ searchTerm }) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    async function getAllInventoryItems() {
      try {
        const allInventoryResponse = await axios.get(
          `${BASE_URL}/inventory?s=${searchTerm}`
        );

        setInventory(allInventoryResponse.data);
      } catch (error) {
        console.error("Failed to fetch all inventories:", error);
      }
    }

    getAllInventoryItems();
  }, [searchTerm]);

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

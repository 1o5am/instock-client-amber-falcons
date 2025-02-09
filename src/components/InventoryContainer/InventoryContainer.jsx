import axios from "axios";
import { useEffect, useState } from "react";
import InventoryList from "../InventoryList/InventoryList";

function InventoryContainer({ searchTerm }) {
  const [inventory, setInventory] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  async function getAllInventoryItems() {
    const allInventoryResponse = await axios.get(
      `${baseURL}/inventory?s=${searchTerm}`
    );
    setInventory(allInventoryResponse.data);
  }

  useEffect(() => {
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

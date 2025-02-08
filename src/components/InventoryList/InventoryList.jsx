import axios from "axios";
import { useEffect, useState } from "react";
import List from "../List/List";

function InventoryList({ searchTerm }) {
  const [inventory, setInventory] = useState([]);

  async function getAllInventoryItems() {
    const allInventoryResponse = await axios.get(
      `http://localhost:8080/api/inventory?s=${searchTerm}`
    );
    console.log(`http://localhost:8080/api/inventory?s=${searchTerm}`);
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
        <List allItems={inventory} onDelete={handleDelete} />
      ) : (
        <></>
      )}
    </>
  );
}

export default InventoryList;

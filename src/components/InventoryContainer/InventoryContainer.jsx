import axios from "axios";
import { useEffect, useState } from "react";
import InventoryTable from "../InventoryTable/InventoryTable";

function InventoryContainer() {
  const [inventory, setInventory] = useState([]);

  async function getAllInventoryItems() {
    const allInventoryResponse = await axios.get(
      `http://localhost:8080/api/inventory`
    );
    setInventory(allInventoryResponse.data);
  }

  useEffect(() => {
    getAllInventoryItems();
  }, []);

  const handleDelete = (deletedId) => {
    setInventory(inventory.filter((item) => item.id !== deletedId));
  };

  return (
    <>
      {inventory ? (
        <InventoryTable allItems={inventory} onDelete={handleDelete} />
      ) : (
        <></>
      )}
    </>
  );
}

export default InventoryContainer;

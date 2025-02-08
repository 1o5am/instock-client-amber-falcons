import axios from "axios";
import { useEffect, useState } from "react";
import InventoryTable from "../InventoryTable/InventoryTable";

function WarehouseInventoryContainer({ id }) {
  const [inventoryById, setInventoryById] = useState([]);
  const handleDelete = (deletedId) => {
    setInventoryById(inventoryById.filter((item) => item.id !== deletedId));
  };

  async function getAllInventoryItemsById() {
    try {
      const inventoryByIdResponse = await axios.get(
        `http://localhost:8080/api/warehouses/${id}/inventories`
      );
      //   console.log(inventoryByIdResponse.data);
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
        <InventoryTable
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

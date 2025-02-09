import axios from "axios";
import { useEffect, useState } from "react";
import InventoryList from "../InventoryList/InventoryList";
import { BASE_URL } from "../../utils/utils.js";

function WarehouseInventoryContainer({ id }) {
  const [inventoryById, setInventoryById] = useState([]);
  const handleDelete = (deletedId) => {
    setInventoryById(inventoryById.filter((item) => item.id !== deletedId));
  };

  useEffect(() => {
    async function getAllInventoryItemsById() {
      try {
        const inventoryByIdResponse = await axios.get(
          `${BASE_URL}/warehouses/${id}/inventories`
        );

        setInventoryById(inventoryByIdResponse.data);
      } catch (error) {
        console.error("Error in fetching inventory by id", error);
      }
    }

    getAllInventoryItemsById();
  }, [id]);

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

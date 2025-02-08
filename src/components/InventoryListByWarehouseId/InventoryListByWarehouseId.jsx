import axios from "axios";
import { useEffect, useState } from "react";
import List from "../List/List";
import React from "react";

function InventoryListByWarehouseId({ id }) {
  const [inventoryById, setInventoryById] = useState([]);
  const handleDelete = (deletedId) => {
    setInventoryById(inventoryById.filter((item) => item.id !== deletedId));
  };
  const baseURL = import.meta.env.VITE_API_URL;

  async function getAllInventoryItemsById() {
    try {
      const inventoryByIdResponse = await axios.get(
        `${baseURL}/warehouses/${id}/inventories`
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
        <List
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

export default InventoryListByWarehouseId;

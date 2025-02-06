import axios from "axios";
import { useEffect, useState } from "react";
import List from "../List/List";
import React from "react";

function InventoryListByWarehouseId({ id }) {
  const [inventoryById, setInventoryById] = useState([]);

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
        <List allItems={inventoryById} isWarehouse={true} />
      ) : (
        <></>
      )}
    </>
  );
}

export default InventoryListByWarehouseId;

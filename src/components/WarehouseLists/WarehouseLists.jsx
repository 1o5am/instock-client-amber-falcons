import axios from "axios";
import { useEffect, useState } from "react";
import WarehouseList from "../WarehouseList/WarehouseList";

const WarehouseLists = () => {
  const [warehouse, setWarehouse] = useState([]);

  async function getAllWarehouseItems() {
    const allWarehouseResponse = await axios.get(
      `http://localhost:8080/api/warehouses`
    );

    console.log("Warehouse", allWarehouseResponse.data);
    setWarehouse(allWarehouseResponse.data);
  }

  useEffect(() => {
    getAllWarehouseItems();
  }, []);

  return <>{warehouse ? <WarehouseList allItems={warehouse} /> : <></>}</>;
};

export default WarehouseLists;

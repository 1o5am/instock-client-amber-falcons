import axios from "axios";
import { useEffect, useState } from "react";
function InventoryList() {
  const [inventory, setInventory] = useState([]);
  async function getAllInventoryItems() {
    const allInventoryResponse = await axios.get(
      `http://localhost:8080/api/inventory`
    );
    setInventory(allInventoryResponse.data);
    console.log(allInventoryResponse.data);
  }

  useEffect(() => {
    getAllInventoryItems();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>INVENTORY ITEM</th>
            <th>CATEGORY</th>
            <th>STATUS</th>
            <th>QTY</th>
            <th>WAREHOUSE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr>
              <td>{item.item_name}</td>
              <td>{item.category}</td>
              <td>{item.status}</td>
              <td>{item.quantity}</td>
              <td>{item.warehouse_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InventoryList;

import React from "react";
import { useParams } from "react-router-dom";
import InventoryListByWarehouseId from "../../components/InventoryListByWarehouseId/InventoryListByWarehouseId";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import WarehouseDetails from "../../components/WareHouseDetails/WarehouseDetails"

function WarehouseDetailPage() {
  const { id } = useParams();
  return (
    <div className="page-content">
      <WarehouseDetails id={id} />
      <InventoryListByWarehouseId id={id} />
    </div>
  );
}

export default WarehouseDetailPage;
 
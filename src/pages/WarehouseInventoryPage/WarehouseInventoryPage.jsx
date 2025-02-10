import { useParams } from "react-router-dom";
import WarehouseInventoryContainer from "../../components/WarehouseInventoryContainer/WarehouseInventoryContainer";
import WarehouseDetails from "../../components/WareHouseDetails/WarehouseDetails";

function WarehouseInventoryPage() {
  const { id } = useParams();

  return (
    <div className="page-content">
      <WarehouseDetails id={id} />
      <WarehouseInventoryContainer id={id} />
    </div>
  );
}

export default WarehouseInventoryPage;

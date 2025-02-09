import { useParams } from "react-router-dom";
import WarehouseInventoryContainer from "../../components/WarehouseInventoryContainer/WarehouseInventoryContainer";

function WarehouseDetailPage() {
  const { id } = useParams();
  return (
    <div className="page-content">
      <WarehouseInventoryContainer id={id} />
    </div>
  );
}

export default WarehouseDetailPage;

import InventoryList from "../../components/InventoryList/InventoryList.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./InventoryPage.scss";
import { useNavigate } from "react-router-dom";

function InventoryPage() {
  const navigate = useNavigate();
  return (
    <div className="page-content inventory-page">
      <div className="inventory-page__header">
        <h1 className="inventory-page__title">Inventory</h1>
        <div className="inventory-page__buttons">
          <Searchbar />
          <button
            onClick={() => {
              navigate("/inventory/add");
            }}
            className="btn btn--primary inventory-page__add"
          >
            + Add New Item
          </button>
        </div>
      </div>

      <InventoryList />
    </div>
  );
}

export default InventoryPage;

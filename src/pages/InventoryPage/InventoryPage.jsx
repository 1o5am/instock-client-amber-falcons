import InventoryContainer from "../../components/InventoryContainer/InventoryContainer.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./InventoryPage.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function InventoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="page-content inventory-page">
      <div className="inventory-page__header">
        <h1 className="inventory-page__title">Inventory</h1>
        <div className="inventory-page__buttons">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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

      <InventoryContainer searchTerm={searchTerm} />
    </div>
  );
}

export default InventoryPage;

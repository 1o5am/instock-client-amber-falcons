import InventoryContainer from "../../components/InventoryContainer/InventoryContainer.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./InventoryPage.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function InventoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("item_name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

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

      <InventoryContainer
        searchTerm={searchTerm}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </div>
  );
}

export default InventoryPage;

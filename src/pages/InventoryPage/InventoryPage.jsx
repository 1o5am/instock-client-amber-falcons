import InventoryList from "../../components/InventoryList/InventoryList.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./InventoryPage.scss";

function InventoryPage() {
  return (
    <div className="page-content inventory-page">
      <div className="inventory-page__header">
        <h1 className="inventory-page__title">Inventory</h1>
        <div className="inventory-page__buttons">
          <Searchbar />
          <button className="inventory-page__add">+ Add New Item</button>
        </div>
      </div>

      <InventoryList />
    </div>
  );
}

export default InventoryPage;

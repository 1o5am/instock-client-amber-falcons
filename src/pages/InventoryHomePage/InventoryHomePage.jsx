import InventoryList from "../../components/InventoryList/InventoryList.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";

function InventoryHomePage() {
  return (
    <div className="page-content">
      <h1>Inventory</h1>
      <Searchbar />
      <button>+ Add New Item</button>
      <InventoryList />
    </div>
  );
}

export default InventoryHomePage;

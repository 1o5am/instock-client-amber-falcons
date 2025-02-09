import "./App.scss";
import "./styles/partials/_global.scss";
import Header from "./components/Header/Header.jsx";
import WarehousePage from "./pages/WarehousePage/WarehousePage.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import WarehouseInventoryPage from "./pages/WarehouseInventoryPage/WarehouseInventoryPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import AddNewItemPage from "./pages/AddNewItemPage/AddNewItemPage.jsx";
import InventoryItemDetailPage from "./pages/InventoryItemDetailPage/InventoryItemDetailPage.jsx";
import AddNewWarehousePage from "./pages/AddNewWarehousePage/AddNewWarehousePage.jsx";
import EditItemPage from "./pages/EditItemPage/EditItemPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/warehouses" />} />
        <Route path="/warehouses" element={<WarehousePage />}></Route>
        <Route path="/warehouses/add" element={<AddNewWarehousePage />}></Route>
        <Route path="/inventory" element={<InventoryPage />}></Route>
        <Route path="/inventory/add" element={<AddNewItemPage />}></Route>
        <Route path="/inventory/edit/:id" element={<EditItemPage />}></Route>
        <Route
          path="/warehouses/:id/inventories"
          element={<WarehouseInventoryPage />}
        ></Route>
        <Route
          path="/inventory/:id"
          element={<InventoryItemDetailPage />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

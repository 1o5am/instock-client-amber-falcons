import "./App.scss";
import "./styles/partials/_global.scss";
import Header from "./components/Header/Header.jsx";
import WarehousePage from "./pages/WarehousePage/WarehousePage.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import WarehouseDetailPage from "./pages/WarehouseDetailPage/WarehouseDetailPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import AddNewItemPage from "./pages/AddNewItemPage/AddNewItemPage.jsx";
import InventoryItemDetailPage from "./pages/InventoryItemDetailPage/InventoryItemDetailPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/warehouses" />} />
        <Route path="/warehouses" element={<WarehousePage />}></Route>
        <Route path="/inventory" element={<InventoryPage />}></Route>
        <Route path="/inventory/add" element={<AddNewItemPage />}></Route>
        <Route
          path="/warehouses/:id/inventories"
          element={<WarehouseDetailPage />}
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

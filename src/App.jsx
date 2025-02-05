import "./App.scss";
import "./styles/partials/_global.scss";
import Header from "./components/Header/Header.jsx";
import WarehousePage from "./pages/WarehousePage/WarehousePage.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/warehouses" />} />
        <Route path="/warehouses" element={<WarehousePage />}></Route>
        <Route path="/inventory" element={<InventoryPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

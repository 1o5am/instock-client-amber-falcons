import "./App.scss";
import Footer from "./components/Footer/Footer.jsx";
import WarehousePage from "./pages/WarehousePage/WarehousePage.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/warehouses" />} />
        <Route path="/warehouses" element={<WarehousePage />}></Route>
        <Route path="/inventory" element={<InventoryPage />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

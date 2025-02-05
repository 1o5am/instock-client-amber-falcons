import "./App.scss";
import "./styles/partials/_global.scss";
import HomePage from "./pages/HomePage/HomePage.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/inventory" element={<InventoryPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

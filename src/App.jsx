import "./App.scss";
import "./styles/partials/_global.scss";
import HomePage from "./pages/HomePage/HomePage.jsx";
import InventoryHomePage from "./pages/InventoryHomePage/InventoryHomePage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/inventory" element={<InventoryHomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

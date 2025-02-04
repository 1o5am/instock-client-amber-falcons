import "./App.scss";
// import Header from "./components/Header/Header.jsx";
// import HomePage from "./pages/HomePage/HomePage.jsx";
// import AboutPage from "./pages/AboutPage/AboutPage.jsx";
// import Footer from "./components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

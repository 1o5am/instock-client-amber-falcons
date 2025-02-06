import WarehouseLists from "../../components/WarehouseLists/WarehouseLists.jsx";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import "./WarehousePage.scss";
// import { useNavigate } from "react-router-dom";

const WarehousePage = () => {
  // const navigate = useNavigate();
  return (
    <div className="page-content warehouse-page">
      <div className="warehouse-page__header">
        <h1 className="warehouse-page__title">Warehouses</h1>
        <div className="warehouse-page__buttons">
          <Searchbar />
          <button
            // onClick={() => {
            //   navigate("/inventory/add");
            // }}
            className="btn btn--primary warehouse-page__add"
          >
            + Add New Item
          </button>
        </div>
      </div>

      <WarehouseLists />
    </div>
  );
};

export default WarehousePage;

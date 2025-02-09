import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import { useState, useEffect } from "react";
import InventoryItemDetails from "../../components/InventoryItemDetails/InventoryItemDetails";
import "./InventoryItemDetailPage.scss";
import { BASE_URL } from "../../utils/utils.js";

function InventoryItemDetailPage() {
  const [inventoryItemDetails, setInventoryItemDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getInventoryItemDetails() {
      try {
        const responseInventoryItemDetail = await axios.get(
          `${BASE_URL}/inventories/${id}`
        );
        setInventoryItemDetails(responseInventoryItemDetail.data);
      } catch (error) {
        console.log("Error: Could not fetch Item details", error);
      }
    }

    getInventoryItemDetails();
  }, [id]);

  return (
    <section className="page-content">
      <div className="page-header-container">
        <div className="page-header-container__icon">
          <a
            onClick={() => {
              navigate(-1);
            }}
            className="page-header-container__back-icon"
          >
            <img src={backArrow} alt="" />
          </a>
          <h1 className="page-header-container__icon__header">
            {inventoryItemDetails.item_name}
          </h1>
        </div>
        <Link
          className="page-header-container__edit-icon"
          to={`/inventory/edit/${id}`}
        >
          {" "}
          <img
            className="page-header-container__edit-icon__image"
            src={editIcon}
            alt=""
          />
        </Link>
        <Link
          className="page-header-container__edit-icon--tablet"
          to={`/inventory/edit/${id}`}
        >
          {" "}
          <img
            className="page-header-container__edit-icon__image"
            src={editIcon}
            alt=""
          />
          <p className="page-header-container__edit-icon__text">Edit</p>
        </Link>
      </div>
      <InventoryItemDetails allDetails={inventoryItemDetails} />
    </section>
  );
}

export default InventoryItemDetailPage;

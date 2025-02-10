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
      <section className="item-details-header">
        <div className="item-details-header__title-button">
          <a
            onClick={() => {
              navigate(-1);
            }}
            className="item-details-header__back"
          >
            <img
              src={backArrow}
              alt="Back"
              className="icon item-details-header__back-icon"
            />
          </a>
          <h1 className="item-details-header__title">
            {inventoryItemDetails.item_name}
          </h1>
        </div>
        <div className="item-details-header__edit-button">
          <Link className="edit-button" to={`/inventory/edit/${id}`}>
            <img className="edit-button__image" src={editIcon} alt="" />
            <p className="edit-button__text">Edit</p>
          </Link>
        </div>
      </section>
      <InventoryItemDetails allDetails={inventoryItemDetails} />
    </section>
  );
}

export default InventoryItemDetailPage;

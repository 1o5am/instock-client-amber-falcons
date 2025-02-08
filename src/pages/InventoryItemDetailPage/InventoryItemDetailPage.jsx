import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import { useState, useEffect } from "react";
import InventoryItemDetails from "../../components/InventoryItemDetails/InventoryItemDetails";
import "./InventoryItemDetailPage.scss";

function InventoryItemDetailPage() {
  const [inventoryItemDetails, setInventoryItemDetails] = useState([]);
  const { id } = useParams();

  async function getInventoryItemDetails() {
    const responseInventoryItemDetail = await axios.get(
      `http://localhost:8080/api/inventory/${id}`
    );
    setInventoryItemDetails(responseInventoryItemDetail.data);
  }

  useEffect(() => {
    getInventoryItemDetails();
  }, []);

  return (
    <section className="page-content">
      <div className="page-header-container">
        <div className="page-header-container__icon">
          <Link to="/inventory">
            {" "}
            <img src={backArrow} alt="" />
          </Link>
          <h1 className="page-header-container__icon__header">
            {inventoryItemDetails.item_name}
          </h1>
        </div>
        <Link className="page-header-container__edit-icon" to="/inventory/:id">
          {" "}
          <img
            className="page-header-container__edit-icon__image"
            src={editIcon}
            alt=""
          />
        </Link>
        <Link
          className="page-header-container__edit-icon--tablet"
          to="/inventory/:id"
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

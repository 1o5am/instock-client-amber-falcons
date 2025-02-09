import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./WarehouseDetails.scss";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import backArrow from "../../assets/icons/arrow_back-24px.svg";

const WarehouseDetails = ({ id }) => {

  const [warehouse, setWarehouse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/warehouses/${id}`);
        console.log("Warehouse detail response:", response.data)
        setWarehouse(response.data);
      } catch (error) {
        console.error("Error fetching warehouse details:", error);
      }
    };

    if (id) {
      fetchWarehouseDetails();
    }
  }, [id]);

  if (!warehouse) {
    return <div>Not getting warehouse data</div>;
    
  }

  return (
    <section className="warehouse-details">
      <div className="warehouse-details__header-container">
          <div className="warehouse-details__header">
            <div className="warehouse-details__title-container">
              <Link to="/warehouses" className="warehouse-details__back ">
                <img src={backArrow} alt="Back" />
              </Link>
              <p className="warehouse-details__title">{warehouse.warehouse_name}</p>
            </div>
          <Link to={`/warehouses/${id}/edit`} className="warehouse-details__edit-button ">
            <img src={editIcon} alt="Edit" />
            <span className="warehouse-details__edit-button__text">Edit</span>
          </Link>
        </div>
      </div>
      <div className="warehouse-details__contact-container">
        <div className="warehouse-details__section">
          <div className="warehouse-details__address-details">
            <p className="warehouse-details__address-label label">WAREHOUSE ADDRESS:</p>
            <div className="warehouse-details__address-value">
              <p className="warehouse-details__text">{warehouse.address},</p>
              <span className="warehouse-details__text">{warehouse.city}, {warehouse.country}</span>
            </div>
          </div>
        </div>
        <div className="warehouse-details__section">
          <div className="warehouse-details__contact-details">
            <div className="warehouse-details__contact-name-container">
              <p className="warehouse-details__contact-label label">CONTACT NAME:</p>
              <p className="warehouse-details__text">{warehouse.contact_name}</p>
              <p className="warehouse-details__text">{warehouse.contact_position}</p>
            </div>

            <div className="warehouse-details__contact-info-container">
              <p className="warehouse-details__contact-label label">CONTACT INFORMATION:</p>
              <p className="warehouse-details__text">{warehouse.contact_phone}</p>
              <p className="warehouse-details__text">{warehouse.contact_email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseDetails;
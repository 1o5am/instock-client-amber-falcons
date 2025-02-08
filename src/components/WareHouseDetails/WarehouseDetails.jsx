import React from "react";
import "./WarehouseDetails.scss";

const WarehouseDetails = ({ id }) => {
  return (
    <section className="warehouse-details">
      <h2 className="warehouse-details__name">{warehouse.name}</h2>
      <div className="warehouse-details-info">
        <div className="warehouse-address">
          <h3 className="warehouse-details__address">Warehouse Address:</h3>
          <p className="warehouse-details__address-value">{warehouse.address}</p>
        </div>
        <div className="warehouse-contact">
          <h3 className="warehouse-details__contact-name">Contact Name:</h3>
          <p className="warehouse-details__contact-value">{warehouse.contactName}</p>
          <h3 className="warehouse-details__contact-info">Contact Information:</h3>
          <p className="warehouse-details__contact-phone">{warehouse.contactPhone}</p>
          <p className="warehouse-details__contact-email">{warehouse.contactEmail}</p>
        </div>
      </div>
      <button className="warehouse-details__edit-button">
        Edit
      </button>
    </section>
  );
};

export default WarehouseDetails;
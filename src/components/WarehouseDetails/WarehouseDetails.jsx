import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./WarehouseDetails.scss";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import backArrow from "../../assets/icons/arrow_back-24px.svg";

const WarehouseDetails = ({ id }) => {
  const [warehouse, setWarehouse] = useState(null);

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/warehouses/${id}`
        );
        console.log("Warehouse detail response:", response.data);
        setWarehouse(response.data);
      } catch (error) {
        console.error("Error fetching warehouse details:", error);
      }
    };

    if (id) {
      fetchWarehouseDetails();
    }
  }, [id]);

  return (
    <>
      {warehouse ? (
        <section className="warehouse-details-page">
          <div className="item-details-header">
            <div className="item-details-header__title-button">
              <Link to="/warehouses" className="warehouse-details-page__back">
                <img
                  src={backArrow}
                  alt="Back"
                  className="icon warehouse-details-page__back-icon"
                />
              </Link>
              <h1 className="warehouse-details-page__title">
                {warehouse.warehouse_name}
              </h1>
            </div>
            <div className="warehouse-details-page__edit-button">
              <Link
                to={`/warehouses/edit/${id}`}
                state={{ from: `/warehouses/${id}/inventories` }}
                className="edit-button"
              >
                <img className="edit-button__image" src={editIcon} alt="Edit" />
                <p className="edit-button__text">Edit</p>
              </Link>
            </div>
          </div>

          <div className="warehouse-details__content">
            <div className="warehouse-details__contact">
              <div className="warehouse-details__section">
                <div className="warehouse-details__address">
                  <p className="warehouse-details__label">WAREHOUSE ADDRESS:</p>
                  <div className="warehouse-details__address-text">
                    <p className="warehouse-details__text">
                      {warehouse.address},
                    </p>
                    <span className="warehouse-details__text">
                      {warehouse.city}, {warehouse.country}
                    </span>
                  </div>
                </div>
              </div>
              <div className="warehouse-details__section">
                <div className="warehouse-details__contact-info">
                  <div className="warehouse-details__contact-name">
                    <p className="warehouse-details__label">CONTACT NAME:</p>
                    <p className="warehouse-details__text">
                      {warehouse.contact_name}
                    </p>
                    <p className="warehouse-details__text">
                      {warehouse.contact_position}
                    </p>
                  </div>

                  <div className="warehouse-details__contact-data">
                    <p className="warehouse-details__label">
                      CONTACT INFORMATION:
                    </p>
                    <p className="warehouse-details__text">
                      {warehouse.contact_phone}
                    </p>
                    <p className="warehouse-details__text">
                      {warehouse.contact_email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="warehouse-details__not-found"></div>
      )}
    </>
  );
};

export default WarehouseDetails;

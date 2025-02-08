import React from "react";
import "./InventoryItemDetails.scss";

function InventoryItemDetails({ allDetails }) {
  return (
    <div className="inventory-content">
      <div className="inventory-content__left">
        <h4 className="inventory-content__header">ITEM DESCRIPTION:</h4>
        <p className="inventory-content__paragraph inventory-content__paragraph--description">
          {allDetails.description}
        </p>
        <h4 className="inventory-content__header">CATEGORY:</h4>
        <p className="inventory-content__paragraph inventory-content__paragraph--tablet">
          {allDetails.category}
        </p>
      </div>
      <div className="inventory-content__right">
        <div className="inventory-content__box">
          <div>
            <h4 className="inventory-content__header">STATUS:</h4>
            <p
              className={`inventory-content__paragraph inventory-content__tag ${
                allDetails.status === "In Stock"
                  ? "inventory-content__tag--green"
                  : "inventory-content__tag--red"
              } `}
            >
              {allDetails.status?.toUpperCase()}
            </p>
          </div>
          <div>
            <h4 className="inventory-content__header">QUANTITY:</h4>
            <p className="inventory-content__paragraph inventory-content__paragraph--quantity">
              {allDetails.quantity}
            </p>
          </div>
        </div>
        <h4 className="inventory-content__header ">WAREHOUSE:</h4>
        <p className="inventory-content__paragraph inventory-content__paragraph--tablet">
          {allDetails.warehouse_name}
        </p>
      </div>
    </div>
  );
}

export default InventoryItemDetails;

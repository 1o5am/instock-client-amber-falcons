import InventoryListItem from "../InventoryListItem/InventoryListItem";
import sortArrowIcon from "../../assets/icons/sort-24px.svg";
import "./InventoryList.scss";

function InventoryList({
  allItems,
  onDelete,
  isWarehouse = false,
  sortField,
  sortOrder,
  onSort,
}) {
  const handleSort = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    onSort(field, newOrder);
  };

  return (
    <div className="list">
      <div className="list-headers--tablet">
        <p className="list__header">
          INVENTORY ITEM
          <img
            className={`icon list__sort-icon ${
              sortField === "item_name" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("item_name")}
          />
        </p>
        <p className="list__header">
          CATEGORY
          <img
            className={`icon list__sort-icon ${
              sortField === "category" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("category")}
          />
        </p>
        <p className="list__header">
          STATUS
          <img
            className={`icon list__sort-icon ${
              sortField === "status" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("status")}
          />
        </p>
        <p className="list__header list__header--small">
          QTY
          <img
            className={`icon list__sort-icon ${
              sortField === "quantity" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("quantity")}
          />
        </p>
        {!isWarehouse && (
          <p className="list__header">
            WAREHOUSE
            <img
              className={`icon list__sort-icon ${
                sortField === "warehouse_name" ? sortOrder : ""
              }`}
              src={sortArrowIcon}
              onClick={() => handleSort("warehouse_name")}
            />
          </p>
        )}
        <p className="list__header list__header--center list__header--small">
          ACTIONS
        </p>
      </div>
      <ul className="list--mobile">
        {allItems.map((item) => (
          <InventoryListItem
            isWarehouse={isWarehouse}
            item={item}
            key={item.id}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;

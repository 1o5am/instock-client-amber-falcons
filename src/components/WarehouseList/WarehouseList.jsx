import WarehouseListItem from "../WarehouseListItem/WarehouseListItem";
import sortArrowIcon from "../../assets/icons/sort-24px.svg";
import "./WarehouseList.scss";

const WarehouseList = ({
  allItems,
  onDelete,
  sortField,
  sortOrder,
  onSort,
}) => {
  const handleSort = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    onSort(field, newOrder);
  };

  return (
    <div className="warehouse-list">
      <div className="warehouse-list-headers--tablet">
        <p className="warehouse-list__header">
          WAREHOUSE
          <img
            className={`icon warehouse-list__sort-icon ${
              sortField === "warehouse_name" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("warehouse_name")}
          />
        </p>
        <p className="warehouse-list__header warehouse-list__header--large">
          ADDRESS
          <img
            className={`icon warehouse-list__sort-icon ${
              sortField === "address" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("address")}
          />
        </p>
        <p className="warehouse-list__header warehouse-list__header--small">
          CONTACT NAME
          <img
            className={`icon warehouse-list__sort-icon ${
              sortField === "contact_name" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("contact_name")}
          />
        </p>
        <p className="warehouse-list__header warehouse-list__header--medium">
          CONTACT INFORMATION
          <img
            className={`icon warehouse-list__sort-icon ${
              sortField === "contact_information" ? sortOrder : ""
            }`}
            src={sortArrowIcon}
            onClick={() => handleSort("contact_information")}
          />
        </p>
        <p className="warehouse-list__header warehouse-list__header--center warehouse-list__header--action">
          ACTIONS
        </p>
      </div>
      <ul className="warehouse-list--mobile">
        {allItems.map((item) => (
          <WarehouseListItem item={item} key={item.id} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default WarehouseList;

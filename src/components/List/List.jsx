import ListItem from "../ListItem/ListItem";
import sortArrowIcon from "../../assets/icons/sort-24px.svg";
import "./List.scss";

function List({ allItems, onDelete }) {
  return (
    <div className="list">
      <div className="list-headers--tablet">
        <p className="list__header">
          INVENTORY ITEM{" "}
          <img className="icon list__sort-icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">
          CATEGORY{" "}
          <img className="icon list__sort-icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">
          STATUS{" "}
          <img className="icon list__sort-icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header list__header--small">
          QTY <img className="icon list__sort-icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">
          WAREHOUSE{" "}
          <img className="icon list__sort-icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header list__header--center list__header--small">
          ACTIONS
        </p>
      </div>
      <ul className="list--mobile">
        {allItems.map((item) => (
          <ListItem item={item} key={item.id} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default List;

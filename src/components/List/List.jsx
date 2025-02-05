import ListItem from "../ListItem/ListItem";
import sortArrowIcon from "../../assets/icons/sort-24px.svg";
import "./List.scss";

function List({ allItems }) {
  return (
    <div className="list">
      <div className="list-headers--tablet">
        <p className="list__header">
          INVENTORY ITEM <img className="icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">
          CATEGORY <img className="icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">
          STATUS <img className="icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">
          QTY <img className="icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">
          WAREHOUSE <img className="icon" src={sortArrowIcon}></img>
        </p>
        <p className="list__header">ACTIONS</p>
      </div>
      <ul className="list--mobile">
        {allItems.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default List;

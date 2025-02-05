function InventoryListItem({ item }) {
  //   console.log(item);
  return (
    <li className="inventory-item__item">
      <div className="inventory-item__info">
        <p>INVENTORY ITEM</p>
        <p>{item.item_name}</p>
      </div>
    </li>
  );
}
export default InventoryListItem;

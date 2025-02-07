const modalMessages = {
  deleteWarehouse: (warehouseName) => ({
    question: `Delete ${warehouseName} warehouse?`,
    message: `Please confirm that you’d like to delete ${warehouseName} from the list of warehouses. You won’t be able to undo this action.`,
  }),
  deleteInventory: (itemName) => ({
    question: `Delete ${itemName} inventory item?`,
    message: `Please confirm that you’d like to delete ${itemName} from the inventory list. You won’t be able to undo this action.`,
  }),
};

export default modalMessages;

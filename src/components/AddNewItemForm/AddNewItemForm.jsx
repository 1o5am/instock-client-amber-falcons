import { useState, useEffect } from "react";
import axios from "axios";
function AddNewItemForm() {
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([
    { name: "Electronics", id: 1 },
    { name: "Gear", id: 2 },
    { name: "Apparel", id: 3 },
    { name: "Accessories", id: 4 },
    { name: "Shampoo", id: 5 },
    { name: "Health", id: 6 },
  ]);
  const [formResponse, setFormResponse] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: 0,
  });
  const radioItems = [
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out Of Stock" },
  ];

  async function getAllWarehouses() {
    const allWarehousesResponse = await axios.get(
      `http://localhost:8080/api/warehouses`
    );
    setWarehouses(allWarehousesResponse.data);
  }

  useEffect(() => {
    getAllWarehouses();
  }, []);

  async function addNewItem() {
    const newItem = {
      warehouse_id: Number(formResponse.warehouse_id),
      item_name: formResponse.item_name,
      description: formResponse.description,
      category: formResponse.category,
      status: formResponse.status,
      quantity: Number(formResponse.quantity),
    };
    try {
      const addItemResponse = await axios.post(
        `http://localhost:8080/api/inventory`,
        newItem
      );
      console.log("Successful!", addItemResponse.data);
    } catch (error) {
      console.log("error", newItem);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormResponse((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    //TODO: check if form is valid first
    addNewItem();
  }

  return (
    <div className="new-item">
      <form className="new-item__form" onSubmit={handleSubmit}>
        <div className="new-item__details">
          <div className="form__item">
            <label htmlFor="name">Item Name</label>
            <input
              id="name"
              name="item_name"
              placeholder="Item Name"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.item_name}
            ></input>
          </div>
          <div className="form__item">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Please enter a brief item description..."
              onChange={(e) => handleInputChange(e)}
              value={formResponse.description}
            ></textarea>
          </div>
          <div className="form__item">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.category}
            >
              <option hidden value="">
                Please select
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="new-item__availability">
          <div className="form__item">
            {radioItems.map((item) => (
              <div key={item.value}>
                <input
                  name="status"
                  type="radio"
                  value={item.value}
                  id={item.value}
                  checked={formResponse.status === item.value}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor={item.value}>{item.label}</label>
              </div>
            ))}
          </div>
          <div className="form__item">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.quantity}
            ></input>
          </div>
          <fieldset className="form__item">
            <label htmlFor="warehouse_id">Warehouse</label>
            <select
              id="warehouse_id"
              name="warehouse_id"
              onChange={(e) => handleInputChange(e)}
              value={formResponse.warehouse_id}
            >
              <option hidden value="">
                Please select
              </option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </select>
          </fieldset>
        </div>
        <div className="new-item__buttons">
          <button className="btn btn--secondary">Cancel</button>
          <button className="btn btn--primary">+ Add Item</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewItemForm;

import "./ItemForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ItemForm() {
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
  const [isFormValidState, setFormValidState] = useState({
    warehouse_id: true,
    item_name: true,
    description: true,
    category: true,
    status: true,
    quantity: true,
  });

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
  function isFormValid() {
    if (!formResponse.item_name.trim()) {
      setFormValidState((prevFormResponse) => {
        return {
          ...prevFormResponse,
          item_name: false,
        };
      });
    }
    if (!formResponse.description.trim()) {
      setFormValidState((prevFormResponse) => {
        return {
          ...prevFormResponse,
          description: false,
        };
      });
    }
    if (!formResponse.category) {
      setFormValidState((prevFormResponse) => {
        return {
          ...prevFormResponse,
          category: false,
        };
      });
    }
    if (!formResponse.status.trim()) {
      setFormValidState((prevFormResponse) => {
        return {
          ...prevFormResponse,
          status: false,
        };
      });
    }
    if (!formResponse.quantity) {
      setFormValidState((prevFormResponse) => {
        return {
          ...prevFormResponse,
          quantity: false,
        };
      });
    }
    if (!formResponse.warehouse_id.trim()) {
      setFormValidState((prevFormResponse) => {
        return {
          ...prevFormResponse,
          warehouse_id: false,
        };
      });
    }
    return false;
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
    if (isFormValid()) {
      addNewItem();
      toast.success("New Item Added");
    } else {
      console.log(isFormValidState);
      toast.error("Error! All fields required");
    }
  }

  return (
    <div>
      <form className="item__form" onSubmit={handleSubmit}>
        <article className="form__details">
          <div className="form__section form__section--right-border">
            <h2 className="form__section-title">Item Details</h2>
            <div className="form__item">
              <label className="form__label" htmlFor="name">
                Item Name
              </label>
              <input
                className={`form__input ${
                  isFormValidState.item_name ? "" : "form__input--error"
                }`}
                id="name"
                name="item_name"
                placeholder="Item Name"
                onChange={(e) => handleInputChange(e)}
                value={formResponse.item_name}
              ></input>
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="description">
                Description
              </label>
              <textarea
                className={`form__input ${
                  isFormValidState.description ? "" : "form__input--error"
                }`}
                id="description"
                name="description"
                placeholder="Please enter a brief item description..."
                onChange={(e) => handleInputChange(e)}
                value={formResponse.description}
                rows={7}
              ></textarea>
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="category">
                Category
              </label>
              <select
                className={`form__input ${
                  isFormValidState.category ? "" : "form__input--error"
                } ${formResponse.category === "" ? "form__input--grey" : ""}`}
                id="category"
                name="category"
                onChange={(e) => handleInputChange(e)}
                value={formResponse.category}
                placeholder="Please select"
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
          <div className="form__section">
            <h2 className="form__section-title">Item Availability</h2>
            <div className="form__item">
              <label className="form__label" htmlFor="status">
                Status
              </label>
              <div className="form__radio-container">
                <div className="form__radio">
                  <input
                    className={`form__input form__input--radio ${
                      isFormValidState.status ? "" : "form__input--error"
                    }`}
                    name="status"
                    type="radio"
                    value="In Stock"
                    id="In Stock"
                    checked={formResponse.status === "In Stock"}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <label
                    className={`form__radio-label ${
                      formResponse.status !== "In Stock"
                        ? "form__radio-label--grey"
                        : ""
                    }`}
                    htmlFor="In Stock"
                  >
                    In Stock
                  </label>
                </div>
                <div className="form__radio">
                  <input
                    className={`form__input form__input--radio ${
                      isFormValidState.status ? "" : "form__input--error"
                    } `}
                    name="status"
                    type="radio"
                    value="Out of Stock"
                    id="Out of Stock"
                    checked={formResponse.status === "Out of Stock"}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <label
                    className={`form__radio-label ${
                      formResponse.status !== "Out of Stock"
                        ? "form__radio-label--grey"
                        : ""
                    }`}
                    htmlFor="Out of Stock"
                  >
                    Out of Stock
                  </label>
                </div>
              </div>
            </div>
            {formResponse.status === "In Stock" ? (
              <div className="form__item">
                <label className="form__label" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className={`form__input ${
                    isFormValidState.quantity ? "" : "form__input--error"
                  }`}
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={(e) => handleInputChange(e)}
                  value={formResponse.quantity}
                ></input>
              </div>
            ) : (
              <></>
            )}

            <div className="form__item">
              <label className="form__label" htmlFor="warehouse_id">
                Warehouse
              </label>
              <select
                className={`form__input ${
                  isFormValidState.warehouse_id ? "" : "form__input--error"
                } ${
                  formResponse.warehouse_id === "" ? "form__input--grey" : ""
                }`}
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
            </div>
          </div>
        </article>
        <div className="form__button-container">
          <div className="form__buttons">
            <button type="reset" className="btn btn--secondary">
              Cancel
            </button>
            <button className="btn btn--primary">+ Add Item</button>
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        theme="colored"
        newestOnTop
        closeOnClick
        autoClose={1000}
      />
    </div>
  );
}

export default ItemForm;

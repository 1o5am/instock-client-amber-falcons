import "./ItemForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ItemForm({ formResponse, setFormResponse, itemManipulation, isNew }) {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([
    { name: "Electronics", id: 1 },
    { name: "Gear", id: 2 },
    { name: "Apparel", id: 3 },
    { name: "Accessories", id: 4 },
    { name: "Shampoo", id: 5 },
    { name: "Health", id: 6 },
  ]);

  const [isFormValidState, setFormValidState] = useState({
    warehouse_id: true,
    item_name: true,
    description: true,
    category: true,
    status: true,
    quantity: true,
  });

  async function getAllWarehouses() {
    const allWarehousesResponse = await axios.get(`${baseURL}/warehouses`);
    setWarehouses(allWarehousesResponse.data);
  }

  useEffect(() => {
    getAllWarehouses();
  }, []);

  function setValid(name, bool) {
    setFormValidState((prevFormResponse) => {
      return {
        ...prevFormResponse,
        [name]: bool,
      };
    });
  }
  function isFormValid() {
    let isValid = true;
    if (!formResponse.item_name.trim()) {
      isValid = false;
      setValid("item_name", false);
    }
    if (!formResponse.description.trim()) {
      isValid = false;
      setValid("description", false);
    }
    if (!formResponse.category) {
      isValid = false;
      setValid("category", false);
    }
    if (!formResponse.status.trim()) {
      isValid = false;
      setValid("status", false);
    }
    if (
      formResponse.status === "In Stock" &&
      (!formResponse.quantity || formResponse.quantity <= 0)
    ) {
      isValid = false;
      setValid("quantity", false);
    }
    if (formResponse.status === "Out of Stock") {
      setValid("quantity", true);
      setFormResponse((prevState) => {
        return {
          ...prevState,
          quantity: 0,
        };
      });
    }
    if (!formResponse.warehouse_id) {
      isValid = false;
      setValid("warehouse_id", false);
    }
    if (!isValid) {
      return false;
    }
    return true;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormResponse((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if (value.length > 0) {
      setValid(name, true);
    }

    if (name === "quantity") {
      if (value > 0) {
        setValid("quantity", true);
      } else {
        setValid("quantity", false);
      }
    }
    if (name === "status" && value === "Out of Stock") {
      setValid("quantity", true);
      setFormResponse((prevState) => {
        return {
          ...prevState,
          quantity: 0,
        };
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid()) {
      itemManipulation();
    } else {
      toast.error("Error! All fields required");
    }
    console.log(formResponse, isFormValidState);
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
                    In stock
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
                    Out of stock
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
                  className={`form__input form__input--short ${
                    isFormValidState.quantity ? "" : "form__input--error"
                  }`}
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={(e) => handleInputChange(e)}
                  value={formResponse.quantity}
                ></input>
                {!isFormValidState.quantity && (
                  <p className="error-statement">
                    Quantity must be a positive, non-zero number
                  </p>
                )}
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
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              type="reset"
              className="btn btn--secondary form__cancel-btn"
            >
              Cancel
            </button>
            <button className="btn btn--primary form__add-btn">
              {isNew ? "+ Add Item" : "Save"}
            </button>
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

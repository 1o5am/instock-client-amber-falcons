import "./ItemForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import errorIcon from "../../assets/icons/error-24px.svg";
import { BASE_URL } from "../../utils/utils.js";

function ItemForm({ formResponse, setFormResponse, addOrEditItem, isNew }) {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const categories = [
    { name: "Electronics", id: 1 },
    { name: "Gear", id: 2 },
    { name: "Apparel", id: 3 },
    { name: "Accessories", id: 4 },
    { name: "Shampoo", id: 5 },
    { name: "Health", id: 6 },
  ];

  const [errors, setErrors] = useState({});

  async function getAllWarehouses() {
    try {
      const allWarehousesResponse = await axios.get(`${BASE_URL}/warehouses`);
      setWarehouses(allWarehousesResponse.data);
    } catch (error) {
      console.error("Failed to fetch all warehouses:", error);
    }
  }

  useEffect(() => {
    getAllWarehouses();
  }, []);

  function validateForm() {
    let newErrors = {};
    if (!formResponse.item_name.trim())
      newErrors.item_name = "Item Name is required";

    if (!formResponse.description.trim())
      newErrors.description = "Description is required";

    if (!formResponse.category) newErrors.category = "Category is required";

    if (!formResponse.status.trim()) newErrors.status = "Status is required";
    if (
      formResponse.status === "In Stock" &&
      (!formResponse.quantity || formResponse.quantity <= 0)
    ) {
      newErrors.quantity = "Non-zero quantity is required";
    }
    if (formResponse.status === "Out of Stock") {
      setFormResponse((prevState) => {
        return {
          ...prevState,
          quantity: 0,
        };
      });
    }
    if (!formResponse.warehouse_id)
      newErrors.warehouse_id = "Warehouse is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      if (errors[name]) {
        setErrors((prev) => {
          return {
            ...prev,
            [name]: "",
          };
        });
      }
    }
    if (name === "quantity") {
      if (value > 0) {
        if (errors.quantity) {
          setErrors((prev) => {
            return {
              ...prev,
              quantity: "",
            };
          });
        }
      } else {
        if (!errors.quantity) {
          setErrors((prev) => {
            return {
              ...prev,
              quantity: "Non-zero quantity is required",
            };
          });
        }
      }
    }
    if (name === "status" && value === "Out of Stock") {
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
    if (!validateForm()) return;
    addOrEditItem();
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
                  !errors.item_name ? "" : "form__input--error"
                }`}
                id="name"
                name="item_name"
                placeholder="Item Name"
                onChange={(e) => handleInputChange(e)}
                value={formResponse.item_name}
              ></input>
              {errors.item_name && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Close" />
                  <p className="error__text">{errors.item_name}</p>
                </div>
              )}
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="description">
                Description
              </label>
              <textarea
                className={`form__input ${
                  !errors.description ? "" : "form__input--error"
                }`}
                id="description"
                name="description"
                placeholder="Please enter a brief item description..."
                onChange={(e) => handleInputChange(e)}
                value={formResponse.description}
                rows={7}
              ></textarea>
              {errors.description && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Close" />
                  <p className="error__text">{errors.description}</p>
                </div>
              )}
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor="category">
                Category
              </label>
              <select
                className={`form__input ${
                  !errors.category > 0 ? "" : "form__input--error"
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
              {errors.category && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Close" />
                  <p className="error__text">{errors.category}</p>
                </div>
              )}
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
                      !errors.status ? "" : "form__input--error"
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
                      !errors.status ? "" : "form__input--error"
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
                    !errors.quantity ? "" : "form__input--error"
                  }`}
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={(e) => handleInputChange(e)}
                  value={formResponse.quantity}
                ></input>
                {errors.quantity && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.quantity}</p>
                  </div>
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
                  !errors.warehouse_id ? "" : "form__input--error"
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
              {errors.warehouse_id && (
                <div className="error__container">
                  <img className="error__icon" src={errorIcon} alt="Close" />
                  <p className="error__text">{errors.warehouse_id}</p>
                </div>
              )}
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

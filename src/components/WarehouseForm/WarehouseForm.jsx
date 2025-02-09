import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./WarehouseForm.scss";
import errorIcon from "../../assets/icons/error-24px.svg";

const WarehouseForm = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const [errors, setErrors] = useState({});

  // Custom Validation Functions
  const validateForm = () => {
    let newErrors = {};

    if (!formData.warehouse_name.trim())
      newErrors.warehouse_name = "Warehouse Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.contact_name.trim())
      newErrors.contact_name = "Contact Name is required";
    if (!formData.contact_position.trim())
      newErrors.contact_position = "Contact Position is required";

    // Phone Number Validation
    const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
    if (!formData.contact_phone.trim()) {
      newErrors.contact_phone = "Phone Number is required";
    } else if (!phoneRegex.test(formData.contact_phone)) {
      newErrors.contact_phone = "Invalid phone format. Use +1 (XXX) XXX-XXXX";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = "Email is required";
    } else if (!emailRegex.test(formData.contact_email)) {
      newErrors.contact_email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${baseURL}/warehouses`, formData);
      console.log("Warehouse Added:", response.data);
      navigate("/warehouses");
    } catch (error) {
      console.error(
        "Error adding warehouse:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="warehouse-form">
      <form onSubmit={handleSubmit} className="warehouse-form__container">
        <div className="warehouse-form__sections">
          {/* Warehouse Details */}
          <div className="warehouse-form__section form-row-divider">
            <h2 className="warehouse-form__title">Warehouse Details</h2>
            <div className="warehouse-form__groups">
              <div className="warehouse-form__group">
                <label>Warehouse Name</label>
                <input
                  type="text"
                  name="warehouse_name"
                  value={formData.warehouse_name}
                  onChange={handleChange}
                  placeholder="Warehouse Name"
                  className={errors.warehouse_name ? "input--error" : ""}
                />
                {errors.warehouse_name && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.warehouse_name}</p>
                  </div>
                )}
              </div>

              <div className="warehouse-form__group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className={errors.address ? "input--error" : ""}
                />
                {errors.address && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.address}</p>
                  </div>
                )}
              </div>
              <div className="warehouse-form__group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={errors.city ? "input--error" : ""}
                />
                {errors.city && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.city}</p>
                  </div>
                )}
              </div>

              <div className="warehouse-form__group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className={errors.country ? "input--error" : ""}
                />
                {errors.country && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.country}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="warehouse-form__section form-col-divider">
            <h2 className="warehouse-form__title">Contact Details</h2>
            <div className="warehouse-form__groups">
              <div className="warehouse-form__group">
                <label>Contact Name</label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  placeholder="Contact Name"
                  className={errors.contact_name ? "input--error" : ""}
                />
                {errors.contact_name && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.contact_name}</p>
                  </div>
                )}
              </div>

              <div className="warehouse-form__group">
                <label>Position</label>
                <input
                  type="text"
                  name="contact_position"
                  value={formData.contact_position}
                  onChange={handleChange}
                  placeholder="Position"
                  className={errors.contact_position ? "input--error" : ""}
                />
                {errors.contact_position && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.contact_position}</p>
                  </div>
                )}
              </div>

              <div className="warehouse-form__group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={errors.contact_phone ? "input--error" : ""}
                />
                {errors.contact_phone && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.contact_phone}</p>
                  </div>
                )}
              </div>

              <div className="warehouse-form__group">
                <label>Email</label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={errors.contact_email ? "input--error" : ""}
                />
                {errors.contact_email && (
                  <div className="error__container">
                    <img className="error__icon" src={errorIcon} alt="Close" />
                    <p className="error__text">{errors.contact_email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="warehouse-form__button-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/warehouses");
            }}
            type="reset"
            className="warehouse-form__button warehouse-form__button--cancel btn btn--secondary"
          >
            Cancel
          </button>
          <button className="warehouse-form__button warehouse-form__button--add btn btn--primary">
            + Add Warehouse
          </button>
        </div>
      </form>
    </div>
  );
};

export default WarehouseForm;

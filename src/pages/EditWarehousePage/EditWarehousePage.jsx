import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import "./EditWarehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import errorIcon from "../../assets/icons/error-24px.svg";

function EditWarehousePage() {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [formResponse, setFormResponse] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;

    if (!formResponse.warehouse_name?.trim()) {
      newErrors.warehouse_name = "This field is required";
    }
    if (!formResponse.address?.trim()) {
      newErrors.address = "This field is required";
    }
    if (!formResponse.city?.trim()) {
      newErrors.city = "This field is required";
    }
    if (!formResponse.country?.trim()) {
      newErrors.country = "This field is required";
    }
    if (!formResponse.contact_name?.trim()) {
      newErrors.contact_name = "This field is required";
    }
    if (!formResponse.contact_position?.trim()) {
      newErrors.contact_position = "This field is required";
    }
    if (!formResponse.contact_phone?.trim()) {
      newErrors.contact_phone = "This field is required";
    } else if (!phoneRegex.test(formResponse.contact_phone)) {
      newErrors.contact_phone = "Please enter a valid phone number: +1 (XXX) XXX-XXXX";
    }
    if (!formResponse.contact_email?.trim()) {
      newErrors.contact_email = "This field is required";
    } else if (!emailRegex.test(formResponse.contact_email)) {
      newErrors.contact_email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function getWarehouseDetails() {
    try {
      const response = await axios.get(`${baseURL}/api/warehouses/${id}`);
      setFormResponse({
        warehouse_name: response.data.warehouse_name,
        address: response.data.address,
        city: response.data.city,
        country: response.data.country,
        contact_name: response.data.contact_name,
        contact_position: response.data.contact_position,
        contact_phone: response.data.contact_phone,
        contact_email: response.data.contact_email
      });
    } catch (error) {
      console.error(`Error: Could not get Warehouse with id ${id}`, error);
      toast.error("Failed to load warehouse details");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWarehouseDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormResponse(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(`${baseURL}/api/warehouses/${id}`, formResponse);
        toast.success("Warehouse updated successfully");
        navigate("/warehouses");
      } catch (error) {
        console.error("Error updating warehouse:", error);
        toast.error("Failed to update warehouse");
      }
    }
  };

  if (isLoading) {
    return <div className="edit-warehouse-page__loading">Loading...</div>;
  }

  return (
    <div className="edit-warehouse-page">
      <div className="edit-warehouse-page__header">
        <img 
          className="edit-warehouse-page__back" 
          src={backArrow} 
          alt="Back"
          onClick={() => navigate(-1)}
        />
        <h1 className="edit-warehouse-page__title">Edit Warehouse</h1>
      </div>

      <form className="item__form" onSubmit={handleSubmit}>
        <div className="form__details">
          <section className="form__section form__section--right-border">
            <p className="form__section-title title">Warehouse Details</p>
            
            <div className="form__item">
              <label htmlFor="warehouse_name">Warehouse Name</label>
              <input
                type="text"
                id="warehouse_name"
                name="warehouse_name"
                value={formResponse.warehouse_name}
                onChange={handleInputChange}
                className={errors.warehouse_name ? "error" : ""}
              />
              {errors.warehouse_name && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.warehouse_name}</span>
                </div>
              )}
            </div>

            <div className="form__item">
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formResponse.address}
                onChange={handleInputChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.address}</span>
                </div>
              )}
            </div>

            <div className="form__item">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formResponse.city}
                onChange={handleInputChange}
                className={errors.city ? "error" : ""}
              />
              {errors.city && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.city}</span>
                </div>
              )}
            </div>

            <div className="form__item">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formResponse.country}
                onChange={handleInputChange}
                className={errors.country ? "error" : ""}
              />
              {errors.country && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.country}</span>
                </div>
              )}
            </div>
          </section>

          <section className="form__section">
            <p className="form__section-title title">Contact Details</p>
            
            <div className="form__item">
              <label htmlFor="contact_name">Contact Name</label>
              <input
                type="text"
                id="contact_name"
                name="contact_name"
                value={formResponse.contact_name}
                onChange={handleInputChange}
                className={errors.contact_name ? "error" : ""}
              />
              {errors.contact_name && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.contact_name}</span>
                </div>
              )}
            </div>

            <div className="form__item">
              <label htmlFor="contact_position">Position</label>
              <input
                type="text"
                id="contact_position"
                name="contact_position"
                value={formResponse.contact_position}
                onChange={handleInputChange}
                className={errors.contact_position ? "error" : ""}
              />
              {errors.contact_position && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.contact_position}</span>
                </div>
              )}
            </div>

            <div className="form__item">
              <label htmlFor="contact_phone">Phone Number</label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                value={formResponse.contact_phone}
                onChange={handleInputChange}
                placeholder="+1 (XXX) XXX-XXXX"
                className={errors.contact_phone ? "error" : ""}
              />
              {errors.contact_phone && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.contact_phone}</span>
                </div>
              )}
            </div>

            <div className="form__item">
              <label htmlFor="contact_email">Email</label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                value={formResponse.contact_email}
                onChange={handleInputChange}
                className={errors.contact_email ? "error" : ""}
              />
              {errors.contact_email && (
                <div className="form__error">
                  <img src={errorIcon} alt="Error" />
                  <span>{errors.contact_email}</span>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="form__button-container">
          <div className="form__buttons">
            <button
              type="button"
              className="form__cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="form__add-btn save-btn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditWarehousePage;
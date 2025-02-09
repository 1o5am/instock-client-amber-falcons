import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import "./EditWarehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

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

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check required fields
    if (!formResponse.warehouse_name.trim()) {
      newErrors.warehouse_name = "Warehouse name is required";
    }
    if (!formResponse.address.trim()) {
      newErrors.address = "Street address is required";
    }
    if (!formResponse.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formResponse.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formResponse.contact_name.trim()) {
      newErrors.contact_name = "Contact name is required";
    }
    if (!formResponse.contact_position.trim()) {
      newErrors.contact_position = "Position is required";
    }

    // Validate phone and email
    if (!validatePhone(formResponse.contact_phone)) {
      newErrors.contact_phone = "Please enter a valid phone number: +1 (XXX) XXX-XXXX";
    }
    if (!validateEmail(formResponse.contact_email)) {
      newErrors.contact_email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function getWarehouseDetails() {
    try {
      setIsLoading(true);
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  async function editWarehouse() {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return false;
    }

    try {
      await axios.put(`${baseURL}/api/warehouses/${id}`, formResponse);
      return true;
    } catch (error) {
      console.error("Error: Could not edit warehouse", error);
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update warehouse");
      }
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const isSuccess = await editWarehouse();
      if (isSuccess) {
        toast.success("Success! Warehouse Updated");
        navigate("/warehouses");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    }
  }

  if (isLoading) {
    return <div className="edit-warehouse-page__loading">Loading...</div>;
  }

  return (
    <div className="edit-warehouse-page">
      <div className="edit-warehouse-page__header">
        <button 
          className="edit-warehouse-page__back-button" 
          onClick={() => navigate(-1)}
        >
          <img 
            className="edit-warehouse-page__back-icon" 
            src={backArrow} 
            alt="Back"
          />
          <span>Back</span>
        </button>
        <h1 className="edit-warehouse-page__title">Edit Warehouse</h1>
      </div>

      <form className="edit-warehouse-page__form" onSubmit={handleSubmit}>
        <div className="edit-warehouse-page__form-section">
          <h2 className="edit-warehouse-page__subtitle">Warehouse Details</h2>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="warehouse_name">Warehouse Name</label>
            <input
              type="text"
              id="warehouse_name"
              name="warehouse_name"
              value={formResponse.warehouse_name}
              onChange={handleInputChange}
              className={errors.warehouse_name ? "error" : ""}
            />
            {errors.warehouse_name && <span className="error-message">{errors.warehouse_name}</span>}
          </div>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formResponse.address}
              onChange={handleInputChange}
              className={errors.address ? "error" : ""}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formResponse.city}
              onChange={handleInputChange}
              className={errors.city ? "error" : ""}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formResponse.country}
              onChange={handleInputChange}
              className={errors.country ? "error" : ""}
            />
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
        </div>

        <div className="edit-warehouse-page__form-section">
          <h2 className="edit-warehouse-page__subtitle">Contact Details</h2>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="contact_name">Contact Name</label>
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              value={formResponse.contact_name}
              onChange={handleInputChange}
              className={errors.contact_name ? "error" : ""}
            />
            {errors.contact_name && <span className="error-message">{errors.contact_name}</span>}
          </div>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="contact_position">Position</label>
            <input
              type="text"
              id="contact_position"
              name="contact_position"
              value={formResponse.contact_position}
              onChange={handleInputChange}
              className={errors.contact_position ? "error" : ""}
            />
            {errors.contact_position && <span className="error-message">{errors.contact_position}</span>}
          </div>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="contact_phone">Phone Number</label>
            <input
              type="text"
              id="contact_phone"
              name="contact_phone"
              value={formResponse.contact_phone}
              onChange={handleInputChange}
              className={errors.contact_phone ? "error" : ""}
            />
            {errors.contact_phone && <span className="error-message">{errors.contact_phone}</span>}
          </div>
          <div className="edit-warehouse-page__input-group">
            <label htmlFor="contact_email">Email Address</label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={formResponse.contact_email}
              onChange={handleInputChange}
              className={errors.contact_email ? "error" : ""}
            />
            {errors.contact_email && <span className="error-message">{errors.contact_email}</span>}
          </div>
        </div>

        <div className="edit-warehouse-page__actions">
          <button 
            type="button" 
            className="edit-warehouse-page__cancel"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="edit-warehouse-page__save"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWarehousePage;
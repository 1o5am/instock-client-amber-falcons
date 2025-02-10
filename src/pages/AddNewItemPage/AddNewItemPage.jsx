import "./AddNewItemPage.scss";
import ItemForm from "../../components/ItemForm/ItemForm.jsx";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../utils/utils.js";

function AddNewItemPage() {
  const navigate = useNavigate();
  const [formResponse, setFormResponse] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: 0,
  });

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
        `${BASE_URL}/inventories`,
        newItem
      );
      console.log("New Item Added!");
      return addItemResponse.data;
    } catch (error) {
      console.log("Error: Could not add Item", error);
      return false;
    }
  }

  async function validateAddNew() {
    const result = await addNewItem();
    if (result) {
      toast.success("New Item Added");
      navigate("/inventory", { state: { refresh: true } });
    } else {
      toast.error("Error. Could not add item");
    }
  }

  return (
    <div className="page-content new-item-page">
      <div className="new-item-page__header">
        <a
          onClick={() => {
            navigate(-1);
          }}
          className="new-item-page__back"
        >
          <img className="icon new-item-page__back-icon" src={backArrow}></img>
        </a>
        <h1 className="new-item-page__title">Add New Inventory Item</h1>
      </div>
      <ItemForm
        formResponse={formResponse}
        setFormResponse={setFormResponse}
        addOrEditItem={validateAddNew}
        isNew={true}
      />
    </div>
  );
}

export default AddNewItemPage;

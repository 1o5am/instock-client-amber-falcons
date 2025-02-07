import "./AddNewItemPage.scss";
import ItemForm from "../../components/ItemForm/ItemForm.jsx";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AddNewItemPage() {
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
        `http://localhost:8080/api/inventory`,
        newItem
      );
      console.log(addItemResponse);
      console.log("New Item Added!");
      return true;
    } catch (error) {
      console.log("Error: Could not add Item", error);
      return false;
    }
  }
  function validateAddNew() {
    const isSuccess = addNewItem();
    if (isSuccess) {
      toast.success("New Item Added");
      navigate("/inventory");
    } else {
      toast.error("Error. Could not add item");
    }
  }

  return (
    <div className="page-content new-item-page">
      <div className="new-item-page__header">
        <Link to="/inventory">
          <img className="icon new-item-page__back" src={backArrow}></img>
        </Link>
        <h1 className="new-item-page__title">Add New Inventory Item</h1>
      </div>
      <ItemForm
        formResponse={formResponse}
        setFormResponse={setFormResponse}
        itemManipulation={validateAddNew}
        isNew={true}
      />
    </div>
  );
}

export default AddNewItemPage;

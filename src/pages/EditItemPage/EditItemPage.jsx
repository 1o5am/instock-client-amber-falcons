import ItemForm from "../../components/ItemForm/ItemForm.jsx";
import "./EditItemPage.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../utils/utils.js";

function EditItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formResponse, setFormResponse] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: 0,
  });

  async function getItemDetails() {
    try {
      const getItemResponse = await axios.get(`${BASE_URL}/inventory/${id}`);
      setFormResponse({
        warehouse_id: getItemResponse.data.warehouse_id,
        item_name: getItemResponse.data.item_name,
        description: getItemResponse.data.description,
        category: getItemResponse.data.category,
        status: getItemResponse.data.status,
        quantity: getItemResponse.data.quantity,
      });
    } catch (error) {
      console.log(`Error: Could not get Item with id ${id}`, error);
    }
  }
  useEffect(() => {
    getItemDetails();
  }, []);

  async function editItem() {
    const editItem = {
      warehouse_id: Number(formResponse.warehouse_id),
      item_name: formResponse.item_name,
      description: formResponse.description,
      category: formResponse.category,
      status: formResponse.status,
      quantity: Number(formResponse.quantity),
    };
    try {
      await axios.put(`${BASE_URL}/inventory/${id}`, editItem);
      console.log("Item Edited!");
      return true;
    } catch (error) {
      console.log("Error: Could not edit Item", error);
      return false;
    }
  }
  async function validateEditItem() {
    try {
      const isSuccess = await editItem();
      if (isSuccess) {
        toast.success("Success! Item Edited");
        navigate(-1);
      } else {
        toast.error("Error. Could not edit item");
      }
    } catch (error) {
      console.error("Unexpected error in validateEditItem:", error);
      toast.error("An unexpected error occurred.");
    }
  }
  return (
    <div className="page-content edit-item-page">
      <div className="edit-item-page__header">
        <a
          onClick={() => {
            navigate(-1);
          }}
        >
          <img className="icon edit-item-page__back" src={backArrow}></img>
        </a>
        <h1 className="edit-item-page__title">Edit Inventory Item</h1>
      </div>
      <ItemForm
        formResponse={formResponse}
        setFormResponse={setFormResponse}
        addOrEditItem={validateEditItem}
        isNew={false}
      />
    </div>
  );
}

export default EditItemPage;

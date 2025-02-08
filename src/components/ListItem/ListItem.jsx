import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowIcon from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import "./ListItem.scss";
import { useState } from "react";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import modalMessages from "../../constants/modalMessages";

function ListItem({ item, onDelete, isWarehouse }) {
  const baseURL = import.meta.env.VITE_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    question: "",
    message: "",
  });

  const openDeleteModal = () => {
    setModalContent(modalMessages.deleteInventory(item.item_name));
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/inventory/${item.id}`);
      onDelete(item.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  return (
    <li className="item">
      <div className="item__info">
        <p className="item__title">INVENTORY ITEM</p>
        <Link to={`/inventory/${item.id}`}>
          <p className="item__name item__name--bold item__name--blue text-link">
            {item.item_name} <img className="icon" src={arrowIcon}></img>
          </p>
        </Link>
      </div>
      <div className="item__info item__info--tablet">
        <p className="item__title">CATEGORY</p>
        <p className="item__name">{item.category}</p>
      </div>
      <div className="item__info">
        <p className="item__title">STATUS</p>
        <p
          className={`item__name item__name--bold item__name--bubble ${
            item.status === "In Stock" ? "item__name--green" : "item__name--red"
          }`}
        >
          {item.status.toUpperCase()}
        </p>
      </div>
      <div className="item__info item__info--mobile">
        <p className="item__title">CATEGORY</p>
        <p className="item__name">{item.category}</p>
      </div>
      <div className="item__info item__info--small">
        <p className="item__title">QTY</p>
        <p className="item__name">{item.quantity}</p>
      </div>
      {!isWarehouse && (
        <div className="item__info item__info--right">
          <p className="item__title">WAREHOUSE</p>
          <p className="item__name">{item.warehouse_name}</p>
        </div>
      )}
      <div
        className={`item__icons ${isWarehouse ? "item__icons--warehouse" : ""}`}
      >
        <button onClick={openDeleteModal} className="icon__button">
          <img className="icon" src={deleteIcon} alt="Delete" />
        </button>
        <Link to={`/inventory/edit/${item.id}`}>
          <img className="icon" src={editIcon}></img>
        </Link>
      </div>

      {isModalOpen && (
        <DeleteModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          question={modalContent.question}
          message={modalContent.message}
        />
      )}
    </li>
  );
}
export default ListItem;

import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowIcon from "../../assets/icons/chevron_right-24px.svg";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import modalMessages from "../../constants/modalMessages";
import "./WarehouseListItem.scss";
import { BASE_URL } from "../../utils/utils.js";

const WarehouseListItem = ({ item, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    question: "",
    message: "",
  });

  const openDeleteModal = () => {
    setModalContent(modalMessages.deleteWarehouse(item.warehouse_name));
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/warehouses/${item.id}`);
      onDelete(item.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  return (
    <li className="warehouse-item">
      <div className="warehouse-item__info warehouse-item__info--col1">
        <p className="warehouse-item__title">WAREHOUSE</p>
        <Link to={`${item.id}/inventories`} className="text-link">
          <p className="warehouse-item__name warehouse-item__name--bold warehouse-item__name--blue text-link__content">
            {item.warehouse_name} <img className="icon" src={arrowIcon}></img>
          </p>
        </Link>
      </div>
      <div className="warehouse-item__info warehouse-item__info--large warehouse-item__info--col3">
        <p className="warehouse-item__title">ADDRESS</p>
        <p className="warehouse-item__name">
          {item.address}, {item.city}, {item.country}
        </p>
      </div>
      <div className="warehouse-item__info warehouse-item__info--small warehouse-item__info--col2">
        <p className="warehouse-item__title">CONTACT NAME</p>
        <p className="warehouse-item__name">{item.contact_name}</p>
      </div>
      <div className="warehouse-item__info warehouse-item__info--medium warehouse-item__info--col4">
        <p className="warehouse-item__title">CONTACT INFORMATION</p>
        <p className="warehouse-item__name">{item.contact_phone}</p>
        <p className="warehouse-item__name">{item.contact_email}</p>
      </div>
      <div className="warehouse-item__icons">
        <button onClick={openDeleteModal} className="icon__button">
          <img className="icon" src={deleteIcon} alt="Delete" />
        </button>
        <Link to={`edit/${item.id}`} state={{ from: "/warehouses" }}>
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
};
export default WarehouseListItem;

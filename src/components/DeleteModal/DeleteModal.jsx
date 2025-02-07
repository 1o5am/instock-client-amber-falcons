import "./DeleteModal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";

const DeleteModal = ({ isOpen, onClose, onConfirm, question, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
          <h2 className="modal__title">{question}</h2>
          <p className="modal__message">{message}</p>
        </div>
        <div className="modal__actions">
          <button
            className="modal__button btn btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="modal__button btn btn--delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
        <button onClick={onClose} className="modal__button--close">
          <img className="icon" src={closeIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;

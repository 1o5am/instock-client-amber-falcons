import AddNewItemForm from "../../components/AddNewItemForm/AddNewItemForm.jsx";
import "./AddNewItemPage.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
function AddNewItemPage() {
  return (
    <div className="page-content new-item-page">
      <div className="new-item-page__header">
        <img className="icon new-item-page__back" src={backArrow}></img>
        <h1 className="new-item-page__title">Add New Inventory Item</h1>
      </div>
      <AddNewItemForm />
    </div>
  );
}

export default AddNewItemPage;

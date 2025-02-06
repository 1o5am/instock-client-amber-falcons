import "./Searchbar.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
function Searchbar() {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="searchbar__bar"
        placeholder="Search..."
      ></input>
      <img className="searchbar__icon" src={searchIcon} />
    </div>
  );
}

export default Searchbar;

import "./Searchbar.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
function Searchbar() {
  return (
    <>
      <input type="text" className="searchbar" placeholder="Search..."></input>
      <img className="searchbar__icon" src={searchIcon} />
    </>
  );
}

export default Searchbar;

import "./Searchbar.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import { useEffect } from "react";

function Searchbar({ searchTerm, setSearchTerm }) {
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }
  useEffect(() => {
    setSearchTerm("");
  }, [setSearchTerm]);

  return (
    <div className="searchbar">
      <input
        type="text"
        className="searchbar__bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e)}
      ></input>
      <img className="searchbar__icon" src={searchIcon} />
    </div>
  );
}

export default Searchbar;

import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-bar">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for a city"
          aria-label="Search for a city"
        />
        <button type="submit" className="search-button">
          <FaSearch className="fa-search" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

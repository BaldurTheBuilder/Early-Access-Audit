import React, { useState } from "react";
import {useGameSearchContext} from '../../context/GlobalState';

// import '../../styles/Header.css';



const SearchBar = () => {
  const {handleSearch} = useGameSearchContext();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  }



  return (
    <>
      <h1>Early Access Searcher</h1>
      <span className="text-primary">
        Retrieve information for a given early access game.
      </span>
      <hr></hr>
      <div className="form-group">
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label style={{ marginRight: '5px' }}>Retrieve GitHub Issues</label>
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="1158940"
            />
            <button className="btn" type="submit" style={{ margin: '5px' }}>
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SearchBar;

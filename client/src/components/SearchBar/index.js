import React, { useState } from "react";
import {useGameSearchContext} from '../../context/GlobalState';
import { useQuery, useMutation } from "@apollo/client";
import { PROCESS_GAME_SEARCH } from "../../api/mutations";

// import '../../styles/Header.css';

const SearchBar = () => {
  const {handleSearch, handleResults } = useGameSearchContext();
  const [search, setSearch] = useState("");

  const [processSearch] = useMutation(PROCESS_GAME_SEARCH);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let numberifiedSearch = parseInt(search);
    console.log(`numberified search is: ${numberifiedSearch}`);
    if(typeof(numberifiedSearch) !== "number" || numberifiedSearch < 1 || isNaN(numberifiedSearch)) return 0;
    handleSearch(parseInt(search));
    processSearch({
      variables: { steam_appid: parseInt(search)}
  })
  .then((result) => {
    console.log('Mutation result:', result);
    // Handle successful response here
    handleResults(result.data.processGame);
  }).catch((error) => {
    console.error('Mutation error:', error);
    // Handle error response here
  });
  };


  return (
    <>
      <h1>Search Bar</h1>
      <span className="text-primary">
        Retrieve information for a given early access game.
      </span>
      <hr></hr>
      <div className="form-group">
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
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

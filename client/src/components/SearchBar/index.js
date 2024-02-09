import React, { useState } from "react";

// import '../../styles/Header.css';

function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    alert(`you submitted the form.\n
        Your search was: ${search}.`);
    event.preventDefault();

    // Simulate form submission by clearing input fields
    setSearch("");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 ">
            <h3>Search bar goes here</h3>
          </div>

          <div className="col-lg-6 col-sm-12">
            <form onSubmit={handleSubmit}>
              <label>
                Search
                <br />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                />
              </label>
              <br />
              <button type="submit" style={{ marginTop: 16 }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SearchBar;

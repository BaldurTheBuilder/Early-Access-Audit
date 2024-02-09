import React from "react";

import GameInformation from "../components/GameInformation";
import SearchBar from "../components/SearchBar";
import profilePicture from "../assets/profilePicture.jpg";

export default function Home() {
  return (
    <div className="container">
      <div>
        <h4>Home</h4>
        <p>
          Welcome to Early Access Audit. Simply enter the name of a video game or its steam application ID number and press enter to view statistics for the game.
        </p>
        <div>
          {/*We need to have two components: a search bar, and a game information component. */}
          <SearchBar/>
          <GameInformation/>
        </div>
      </div>
    </div>
  );
}

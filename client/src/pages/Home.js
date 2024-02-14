import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_GAME, QUERY_GAMES } from "../api/queries";
import { GameSearchProvider } from "../context/GlobalState";

import GameInformation from "../components/GameInformation";
import SearchBar from "../components/SearchBar";
import profilePicture from "../assets/profilePicture.jpg";

export default function Home() {
  return (
    <div className="container">
      <div>
        <h4>Home</h4>
        <p>
          Welcome to Early Access Audit. Simply enter the name of a video game
          or its steam application ID number and press enter to view statistics
          for the game.
        </p>
        <div>
          <GameSearchProvider>
            {/*We need to have two components: a search bar, and a game information component. */}
            <SearchBar />
            <GameInformation/>
          </GameSearchProvider>
        </div>
      </div>
    </div>
  );
}

// right now this isn't working. I have a few options for how to pass the value between the components:
// 1) figure out context api.
// 2) use useParams() and put the game information as a variable in the route URL.

import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import { useGameSearchContext } from "../../context/GlobalState";

import { QUERY_SINGLE_GAME, QUERY_GAMES } from "../../api/queries";

function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 86400) return "Less than a day!";

  let ourString = "Approximately ";
  let months = false;
  let years = false;

  let interval = seconds / 31536000;
  if (interval >= 1) {
    ourString+= Math.floor(interval) + " years";
    years = true;
  }

  seconds = seconds - (Math.floor(interval) * 31536000);
  interval = seconds / 2592000;
  if (interval >= 1) {
    if(years) ourString += ", ";
    ourString += Math.floor(interval) + " months";
    months = true;
  }

  seconds = seconds - (Math.floor(interval) * 2592000);
  interval = seconds / 86400;
  if (interval >= 1) {
    if(months) ourString += ", ";
    ourString += Math.floor(interval) + " days.";
  }
  

return ourString;
}


const GameInformation = () => {
  // gather the game ID from the search bar
  const { gameId } = useGameSearchContext();

  // run the query to collect information
  const GameQuery = useQuery(QUERY_SINGLE_GAME, {
    variables: { steam_appid: gameId },
  });
  const GameData = GameQuery.data;

  // if there is game data and isEarlyAccess isn't null, we know both that the search was successful and that there is a game with the searched ID.
  if (GameData && GameData.singleGame.isEarlyAccess != null) {
    // clean up the GameData object a little.
    const drilledGameData = GameData.singleGame;

    return (
      <div>
        <h3>Search results go here</h3>
        <p>Results for Game ID: {gameId}</p>
        <span className="text-primary">
          Name: {drilledGameData.name} <br />
          Steam_appid: {drilledGameData.steam_appid} <br />
          developer: {drilledGameData.developer} <br />
          publisher: {drilledGameData.publisher} <br />
          isEarlyAccess: {drilledGameData.isEarlyAccess.toString()} <br />
          release_date: {drilledGameData.release_date} <br />
          time since release: {timeSince(Date.parse(drilledGameData.release_date))} <br/>
        </span>
        release_date: {Date.parse(drilledGameData.release_date)} <br />
      </div>
    );
  };
  // if there is no GameData or we received a null in isEarlyAccess, we provide a boilerplate response.
  return (
    <div>
      <p>No gamedata loaded, or no game with the searched ID.</p>
    </div>
  );
};

export default GameInformation;

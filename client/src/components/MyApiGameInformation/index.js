import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import "../../styles/dark-theme.css"

import { useGameSearchContext } from "../../context/GlobalState";

import { QUERY_SINGLE_API_GAME, QUERY_GAMES } from "../../api/queries";

// accept a unix timecode and return the time since then as a string.
function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 86400) return "Less than a day!";

  let ourString = "";
  let months = false;
  let years = false;

  let interval = seconds / 31536000;
  if (interval >= 1) {
    ourString += Math.floor(interval) + " years";
    years = true;
  }

  seconds = seconds - Math.floor(interval) * 31536000;
  interval = seconds / 2592000;
  if (interval >= 1) {
    if (years) ourString += ", ";
    ourString += Math.floor(interval) + " months";
    months = true;
  }

  seconds = seconds - Math.floor(interval) * 2592000;
  interval = seconds / 86400;
  if (interval >= 1) {
    if (years || months) ourString += ", ";
    ourString += Math.floor(interval) + " days.";
  }

  return ourString;
}

const MyApiGameInformation = () => {
  // gather the game ID from the search bar
  const { gameId } = useGameSearchContext();

  // run the query to collect information
  const GameQuery = useQuery(QUERY_SINGLE_API_GAME, {
    variables: { steam_appid: gameId },
  });
  const GameData = GameQuery.data;

  // if there is game data and isEarlyAccess isn't null, we know both that the search was successful and that there is a game with the searched ID.
  if (GameData && GameData.singleApiGame != null) {
    // clean up the GameData object a little.
    const drilledGameData = GameData.singleApiGame;
    const numberifiedReleaseDate = Number(drilledGameData.originalRelease);
    const dateifiedReleaseDate = new Date(numberifiedReleaseDate);
    const timeSinceRelease = timeSince(numberifiedReleaseDate
    );

    const earlyAccessStatus = (earlyAccess, releaseDate) => {
      let seconds = Math.floor((new Date() - releaseDate) / 1000);
      if (!earlyAccess) return "⭐Completed release⭐";
      if (seconds < 31536000) return "😊Less than a year in early access!😊";
      if (seconds < 63072000) return "Two years in EA...";
      if (seconds < 157680000) return "😳Long term early access😳";
      else return "💀Eternally early access💀";
    };

    return (
      <div>
        <p>API Results for Game ID: {gameId}</p>
        <span className="text-primary">
          {drilledGameData.name} <br />
          {earlyAccessStatus(
            drilledGameData.isEarlyAccess,
            Date.parse(dateifiedReleaseDate)
          )}{" "}
          <br />
          Release date: {dateifiedReleaseDate.toDateString()}<br />
          Time since release: {timeSinceRelease} <br />
          Developer: {drilledGameData.developer} <br />
          Publisher: {drilledGameData.publisher} <br />
        </span>
      </div>
    );
  }
  // if there is no GameData or we received a null in isEarlyAccess, we provide a boilerplate response.
  return (
    <div>
      <p>No gamedata loaded, or no game with the searched ID.</p>
    </div>
  );
};

export default MyApiGameInformation;

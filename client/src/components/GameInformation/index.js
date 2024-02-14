import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import { useGameSearchContext } from "../../context/GlobalState";

import { QUERY_SINGLE_GAME, QUERY_GAMES } from "../../api/queries";


const GameInformation = () => {
  const {gameId} = useGameSearchContext();

  const GameQuery = useQuery(QUERY_SINGLE_GAME, {
    variables: {steam_appid: gameId}
  });
  const GameData = GameQuery.data;
console.log(`-------------------gameId is: ${gameId}---------------------`);

  return (
    <div>
      <h3>Search results go here</h3>
      <p>Results for Game ID: {gameId}</p>
      <span className="text-primary">
        Stored in state variable <code>{JSON.stringify(GameData)}</code>
      </span>

    </div>
  );
};

export default GameInformation;

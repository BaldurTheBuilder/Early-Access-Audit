import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_GAME, QUERY_GAMES } from "../../api/queries";


const GameInformation = () => {
    // use context a la 3rd-project-boot-campers to identify where this is. This is how we will grab the game id being searched.
    // const [state] = currentContext();
    // const appId = state.appId;

  const GameQuery = useQuery(QUERY_SINGLE_GAME, {
    variables: {steam_appid: 1158940}
  });
  const GameData = GameQuery.data;


  return (
    <div>
      <h3>Search results go here</h3>
      <span className="text-primary">
        Stored in state variable <code>{JSON.stringify(GameData)}</code>
      </span>

    </div>
  );
};

export default GameInformation;

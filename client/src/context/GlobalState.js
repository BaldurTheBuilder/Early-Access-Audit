import React, { createContext, useState, useContext } from "react";

const GameSearchContext = createContext();

const useGameSearchContext = () => useContext(GameSearchContext);

// GameSearchProvider to hold initial state, return provider component
const GameSearchProvider = ({ children }) => {
  const [gameId, setGameId] = useState(0);
  const [gameObject, setGameObject] = useState({  
    steam_appid: 0,  
    name: "",
    isEarlyAccess: null,
    everEarlyAccess: null,
    updatedRelease: 0,
    originalRelease: 0,
    lastUpdate: 0,
    developer: "",
    publisher: "",

    // totalFunding: searchedSteamGame.totalFunding,
    // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
  })

  const handleSearch = (search) => {
    console.log(`handleSearch called with: ${search}.`);
    setGameId(Number(search));
  };
  
  const handleResults = (results) => {
    console.log(`handleResults called with: ${JSON.stringify(results)}`);
    setGameObject(results);
  }

  return (
    <GameSearchContext.Provider value={{ gameId, gameObject, handleSearch, handleResults }}>
      {children}
    </GameSearchContext.Provider>
  );
};

export { useGameSearchContext, GameSearchProvider };

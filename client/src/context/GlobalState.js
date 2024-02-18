import React, { createContext, useState, useContext } from "react";

const GameSearchContext = createContext();

const useGameSearchContext = () => useContext(GameSearchContext);

// GameSearchProvider to hold initial state, return provider component
const GameSearchProvider = ({ children }) => {
  const [gameId, setGameId] = useState(0);

  const steam_appid = 0;
  const gameData = {
    steam_appid: 0,
    name: "",
    developer: "",
    publisher: "",
    genres: [],
    release_date: [],
  };

  const handleSearch = (search) => {
    console.log(`handleSearch called with: ${search}.`);
    setGameId(Number(search));
  };

  return (
    <GameSearchContext.Provider value={{ gameId, gameData, handleSearch }}>
      {children}
    </GameSearchContext.Provider>
  );
};

export { useGameSearchContext, GameSearchProvider };

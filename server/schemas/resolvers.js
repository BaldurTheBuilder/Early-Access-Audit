const axios = require("axios");
const { Game } = require("../models");

const resolvers = {
  Query: {
    games: async () => {
      return Game.find();
    },
    singleSteamGame: async (parent, { steam_appid }) => {
      if (steam_appid === "") return {};

      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${steam_appid}`
      );
      if (!response.data[steam_appid].success) return 0;
      const gameData = response.data[steam_appid].data;

      let isEarlyAccess = false;
      for (let index = 0; index < gameData.genres.length; index++) {
        if (gameData.genres[index].description == "Early Access") {
          isEarlyAccess = true;
          break;
        }
      }

      return {
        name: gameData.name,
        steam_appid: gameData.steam_appid,
        developer: gameData.developers[0],
        publisher: gameData.publishers[0],
        isEarlyAccess: isEarlyAccess,
        release_date: gameData.release_date.date,
      };
      // let ourGame = Game.find({ steam_appid: steam_appid });
      // if(ourGame) return ourGame;

      // if we have the game logged already
      // if (ourGame) {
      //   // if the game doesn't have the early access tag, return game
      //   // if the game does have the early access tag, run mutation
      //   // temporarily: just send it back if there's a game
      //   return ourGame;
      // }
      // // if we don't have the game logged already
      // else {
      // call the steam API to see if the game exists
      // if it exists, create a log of the game's information with a mutation
      // temporarily: just return the steam api game
      // const FetchSteam = async () => {
      //   let fetchingURL = `https://store.steampowered.com/api/appdetails?appids=${steam_appid}`;
      //   const response = await fetch(fetchingURL);
      //   const data = await response.json();
      //   let ourObject = {
      //     name: data.name,
      //     steam_appid: data.steam_appid
      //   }
      //   return ourObject;
      // }
      // return FetchSteam();
      // }
    },

    singleApiGame: async (parent, { steam_appid }) => {
      if (steam_appid === "") return {};
      return Game.findOne({steam_appid: steam_appid});
    },
  },
  Mutation: {
    updateGame: async (parent, {steamGame}) => {
      return 1;
    },
    addGame: async (parent, {steam_appid}) => {
      return 1;
    },
  }
};

module.exports = resolvers;
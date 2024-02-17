const axios = require("axios");
const { Game } = require("../models");

const resolvers = {
  Query: {
    games: async () => {
      return Game.find();
    },
    singleSteamGame: async (parent, { steam_appid }, context) => {
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
    },

    singleApiGame: async (parent, { steam_appid }, context) => {
      if (steam_appid === "") return {};
      return Game.findOne({ steam_appid: steam_appid });
    },
  },
  Mutation: {
    updateGame: async (parent, { steam_appid }, context) => {
      // look to confirm there's a game to update that hasn't been updated in at least 7 days
      let searchedApiGame = await context.resolvers.Query.singleApiGame(
        parent,
        { steam_appid },
        context
      );
      if (
        !searchedApiGame ||
        Date.parse(searchedApiGame.lastUpdate) > Date.now() - 604800000
      )
        return {
          name: searchedApiGame.name,
          isEarlyAccess: searchedApiGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: searchedApiGame.release_date,
          lastUpdate: Date.now(),
          developer: searchedApiGame.developer,
          publisher: searchedApiGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        };

      // use our query to see if there's a game at the requested app_id
      let searchedSteamGame = await context.resolvers.Query.singleSteamGame(
        parent,
        { steam_appid },
        context
      );
      if (!searchedSteamGame)
        return { name: "no data in steam for this appid" };

      await Game.findOneAndUpdate(
        { steam_appid: steam_appid },
        {
          name: searchedSteamGame.name,
          isEarlyAccess: searchedSteamGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: searchedSteamGame.release_date,
          lastUpdate: Date.now(),
          developer: searchedSteamGame.developer,
          publisher: searchedSteamGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        }
      );
      return {
        name: searchedSteamGame.name,
        isEarlyAccess: searchedSteamGame.isEarlyAccess,
        // everEarlyAccess: searchedSteamGame.everEarlyAccess,
        updatedRelease: searchedSteamGame.release_date,
        lastUpdate: Date.now(),
        developer: searchedSteamGame.developer,
        publisher: searchedSteamGame.publisher,
        steam_appid: steam_appid,
        // totalFunding: searchedSteamGame.totalFunding,
        // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
      };
    },

    // check the api for the game's existence.
    addGame: async (parent, { steam_appid }, context) => {
      // look to confirm there's a game to update that hasn't been updated in at least 7 days
      let searchedApiGame = await context.resolvers.Query.singleApiGame(
        parent,
        { steam_appid },
        context
      );
      if (searchedApiGame)
        return { name: "There's a game with this ID already." };

      // use our query to see if there's a game at the requested app_id
      let searchedSteamGame = await context.resolvers.Query.singleSteamGame(
        parent,
        { steam_appid },
        context
      );
      if (!searchedSteamGame) return { name: "no steam game at this appid" };

      await Game.create(
        { steam_appid: steam_appid },
        {
          name: searchedSteamGame.name,
          isEarlyAccess: searchedSteamGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: searchedSteamGame.release_date,
          lastUpdate: Date.now(),
          developer: searchedSteamGame.developer,
          publisher: searchedSteamGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        }
      );
      return {
        name: searchedSteamGame.name,
        isEarlyAccess: searchedSteamGame.isEarlyAccess,
        // everEarlyAccess: searchedSteamGame.everEarlyAccess,
        updatedRelease: searchedSteamGame.release_date,
        lastUpdate: Date.now(),
        developer: searchedSteamGame.developer,
        publisher: searchedSteamGame.publisher,
        steam_appid: steam_appid,
        // totalFunding: searchedSteamGame.totalFunding,
        // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
      };
    },

    // combine queries and mutations to process a searched game.
    processGame: async (parent, { steam_appid }, context) => {
      let ourApiHasIt = false;
      // api search
      // look to confirm there's a game to update that hasn't been updated in at least 7 days
      let searchedApiGame = await context.resolvers.Query.singleApiGame(
        parent,
        { steam_appid },
        context
      );
      // if the game exists and isn't early access, or is early access and has been updated within 7 days, return that.
      if (
        searchedApiGame &&
        (!searchedApiGame.isEarlyAccess ||
          Date.parse(searchedApiGame.lastUpdate) > Date.now() - 604800000)
      )
        return {
          name: searchedApiGame.name,
          isEarlyAccess: searchedApiGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: searchedApiGame.release_date,
          lastUpdate: Date.now(),
          developer: searchedApiGame.developer,
          publisher: searchedApiGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        };
      else if (searchedApiGame) ourApiHasIt = true;

      // steam API search
      let searchedSteamGame = await context.resolvers.Query.singleSteamGame(
        parent,
        { steam_appid },
        context
      );

      // if the steam game exists and our API is empty there, use addGame
      if (searchedSteamGame && !ourApiHasIt) {
        await Game.create(
          { steam_appid: steam_appid },
          {
            name: searchedSteamGame.name,
            isEarlyAccess: searchedSteamGame.isEarlyAccess,
            // everEarlyAccess: searchedSteamGame.everEarlyAccess,
            updatedRelease: searchedSteamGame.release_date,
            lastUpdate: Date.now(),
            developer: searchedSteamGame.developer,
            publisher: searchedSteamGame.publisher,
            steam_appid: steam_appid,
            // totalFunding: searchedSteamGame.totalFunding,
            // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
          }
        );
        return {
          name: searchedSteamGame.name,
          isEarlyAccess: searchedSteamGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: searchedSteamGame.release_date,
          lastUpdate: Date.now(),
          developer: searchedSteamGame.developer,
          publisher: searchedSteamGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        };
      }

      // if the game exists and our API has a game, use updateGame
      if (searchedSteamGame && ourApiHasIt) {
        await Game.findOneAndUpdate(
          { steam_appid: steam_appid },
          {
            name: searchedSteamGame.name,
            isEarlyAccess: searchedSteamGame.isEarlyAccess,
            // everEarlyAccess: searchedSteamGame.everEarlyAccess,
            updatedRelease: searchedSteamGame.release_date,
            lastUpdate: Date.now(),
            developer: searchedSteamGame.developer,
            publisher: searchedSteamGame.publisher,
            steam_appid: steam_appid,
            // totalFunding: searchedSteamGame.totalFunding,
            // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
          }
        );
        return {
          name: searchedSteamGame.name,
          isEarlyAccess: searchedSteamGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: searchedSteamGame.release_date,
          lastUpdate: Date.now(),
          developer: searchedSteamGame.developer,
          publisher: searchedSteamGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        };
      }

      return {name: "Error: No game is logged with this ID."};
    },
  },
};

module.exports = resolvers;

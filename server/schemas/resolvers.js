const axios = require("axios");
const { Game, Publisher, Developer } = require("../models");

const resolvers = {
  Query: {
    games: async () => {
      return Game.find();
    },
    singleSteamGame: async (parent, { steam_appid }, context) => {
      if (steam_appid === "") return {};

      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${steam_appid}&?l=en`
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

    publishedGames: async (parent, { publisherName }, context) => {
      return Publisher.findOne({ publisherName: publisherName });
    },

    developedGames: async (parent, { developerName }, context) => {
      return Developer.findOne({ developerName: developerName });
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
      let dateToUse = 0;
      if (searchedSteamGame.release_date != "Coming soon")
        dateToUse = searchedSteamGame.release_date;

      await Game.create(
        { steam_appid: steam_appid },
        {
          name: searchedSteamGame.name,
          isEarlyAccess: searchedSteamGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: 1,
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
      ) {
        return {
          name: searchedApiGame.name,
          isEarlyAccess: searchedApiGame.isEarlyAccess,
          originalRelease: searchedApiGame.originalRelease,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: searchedApiGame.updatedRelease,
          lastUpdate: Date.now(),
          developer: searchedApiGame.developer,
          publisher: searchedApiGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        };
      } else if (searchedApiGame) ourApiHasIt = true;

      // steam API search
      let searchedSteamGame = await context.resolvers.Query.singleSteamGame(
        parent,
        { steam_appid },
        context
      );

      // if the steam game exists and our API is empty there, use addGame
      if (searchedSteamGame && !ourApiHasIt) {
        let dateToUse = 0;
        if (!isNaN(Date.parse(searchedSteamGame.release_date)))
          dateToUse = Date.parse(searchedSteamGame.release_date);

        await Game.create({
          name: searchedSteamGame.name,
          isEarlyAccess: searchedSteamGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: dateToUse,
          originalRelease: dateToUse,
          lastUpdate: Date.now(),
          developer: searchedSteamGame.developer,
          publisher: searchedSteamGame.publisher,
          steam_appid: steam_appid,
          // totalFunding: searchedSteamGame.totalFunding,
          // earlyAccessFunding: searchedSteamGame.earlyAccessFunding
        });
        return {
          name: searchedSteamGame.name,
          isEarlyAccess: searchedSteamGame.isEarlyAccess,
          // everEarlyAccess: searchedSteamGame.everEarlyAccess,
          updatedRelease: dateToUse,
          originalRelease: dateToUse,
          lastUpdate: Date.now(),
          developer: searchedSteamGame.developer,
          publisher: searchedSteamGame.publisher,
          steam_appid: steam_appid,
          originalRelease: searchedSteamGame.release_date,
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

      return { name: "Error: No game is logged with this ID." };
    },

    // add a developer if there isn't one yet.
    createDeveloper: async (
      parent,
      { developerName, developerGame },
      context
    ) => {
      // identify whether the developer exists yet.
      let searchedDeveloper = await context.resolvers.Query.developedGames(
        parent,
        { developerName },
        context
      );
      if (searchedDeveloper)
        return { developerName: "There's a developer with this name already." };

      // create a developer if it doesn't exist yet.
      await Developer.create({
        developerName: developerName,
        developerGames: [developerGame],
      });
      return {
        developerName: developerName,
        developerGames: [developerGame],
      };
    },

    // add a publisher if there isn't one yet.
    createPublisher: async (
      parent,
      { publisherName, publisherGame },
      context
    ) => {
      // identify whether the publisher exists yet.
      let searchedPublisher = await context.resolvers.Query.publishedGames(
        parent,
        { publisherName },
        context
      );
      if (searchedPublisher)
        return { publisherName: "There's a publisher with this name already." };

      // create a publisher if it doesn't exist yet.
      await Publisher.create({
        publisherName: publisherName,
        publisherGames: [publisherGame],
      });
      return {
        publisherName: publisherName,
        publisherGames: [publisherGame],
      };
    },

    // update developer
    updateDeveloper: async (
      parent,
      { developerName, developerGame },
      context
    ) => {
      try {
        const result = await Developer.findOneAndUpdate(
          { developerName },
          { $addToSet: { developerGames: developerGame } }, // Add gameID to developerGames array if not already present
          { returnDocument: "after" } // Create document if not exists, return the updated document
        );

        if (result.ok) {
          console.log("Developer updated successfully.");
        } else {
          console.log("Developer not found.");
        }
      } catch (error) {
        console.error("Error updating developer:", error);
      }
    },

    // update publisher
    updateDeveloper: async (
      parent,
      { publisherName, publisherGame },
      context
    ) => {
      try {
        const result = await Developer.findOneAndUpdate(
          { publisherName },
          { $addToSet: { publisherGames: publisherGame } }, // Add gameID to developerGames array if not already present
          { returnDocument: "after" } // Create document if not exists, return the updated document
        );

        if (result.ok) {
          console.log("Developer updated successfully.");
        } else {
          console.log("Developer not found.");
        }
      } catch (error) {
        console.error("Error updating developer:", error);
      }
    },

    // ideally, the following mutations will be added: delete developer/publisher/game
  },
};
// test
module.exports = resolvers;

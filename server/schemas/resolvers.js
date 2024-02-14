const { AuthenticationError } = require("apollo-server-express");
const axios = require('axios');
const { User, Game } = require("../models");
// maybe change auth.js to index.js for simple imports
const { signToken } = require("../auth/auth");

const resolvers = {
  Query: {
    games: async () => {
      return Game.find();
    },
    singleGame: async (parent, { steam_appid }) => {
      const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${steam_appid}`);
      if(!response.data[steam_appid].success) return 0;
      
      const gameData = response.data[steam_appid].data;
      return {
        name: gameData.name,
        steam_appid: gameData.steam_appid
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

    // users: async () => {
    //   return User.find()
    //   .populate('createdTasks')
    // },
    // user: async (parent, {userId}) => {
    //   return User.find({_id: userId})
    //   .populate('createdTasks')
    // },

    // unclaimedTasks: async () => {
    //   const params = {assignedUser: null};
    //   return Task.find(params);
    // },
  },
  // Mutation: {
  //not using context to check whether we're logged in yet
  // updateImage: async (parent, {gameTitle, image}) => {
  //   return await Project.findOneAndUpdate(
  //     {projectTitle: projectTitle},
  //     {image},
  //     {new: true}
  //     );

  //   }
  //   addUser: async (parent, { username, email, password, firstName }) => {
  //     const user = await User.create({ username, email, password, firstName });
  //     const token = signToken(user);
  //     return { token, user };
  //   },
  //   login: async (parent, { email, password }) => {
  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       throw new AuthenticationError('No user found with this email address');
  //     }

  //     const correctPw = await user.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError('Incorrect credentials');
  //     }

  //     const token = signToken(user);

  //     return { token, user };
  //   },
  //   addTask: async (parent, { taskName, description }, context) => {
  //     if(context.user) {
  //       const task = await Task.create({
  //         taskName,
  //         description,
  //         taskAuthor: context.user.username
  //       });

  //       await User.findOneAndUpdated(
  //         { _id: context.user._id },
  //         { $pull: { createdTasks: task._id }}
  //       );

  //       return task;
  //     }
  //   }
  // },
};

module.exports = resolvers;

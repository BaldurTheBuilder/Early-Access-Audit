const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require("../models");
// maybe change auth.js to index.js for simple imports
// const { signToken } = require('../auth/auth');


const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find()
    //   .populate('createdTasks')
    //   .populate('assignedTasks')
    //   .populate('watchedTasks')
    //   .populate('fundedTasks');
    // },
    // user: async (parent, {userId}) => {
    //   return User.find({_id: userId})
    //   .populate('createdTasks')
    //   .populate('assignedTasks')
    //   .populate('watchedTasks')
    //   .populate('fundedTasks');
    // },
    projects: async () => {
      return Project.find();
    },
    // unclaimedTasks: async () => {
    //   const params = {assignedUser: null};
    //   return Task.find(params);
    // },
  },
  Mutation: {
    //not using context to check whether we're logged in yet
    updateImage: async (parent, {projectTitle, image}) => {
      return await Project.findOneAndUpdate(
        {projectTitle: projectTitle},
        {image},
        {new: true}
        );


      }
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
  },
};

module.exports = resolvers;

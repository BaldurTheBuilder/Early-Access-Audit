const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID
    earlyAccessCurrent: Boolean
    earlyAccessEver: Boolean
    originalRelease: String
    updatedRelease: String
    lastUpdate: String
    gameTitle: String
    developer: String
    publisher: String
    appId: Int
    totalFunding: Int
    earlyAccessFunding: Int
  }
  type SteamGame {
    name: String
    steam_appid: Int
  }

  type Query {
    # users: [User]!
    games: [Game]!
    # unclaimedTasks: [Task]
    singleGame(steam_appid: Int!): SteamGame
  }

  # type Auth {
  #   token: ID!
  #   user: User
  # }

  # type Mutation {
  #   addGame(appId: String!, ): Game
  #   updateGame(): Game

  #   updateImage(projectTitle: String!, image: String!): Project
  #   # addUser(username: String!, email: String!, password: String!, firstName: String!): Auth
  #   # login(email: String!, password: String!): Auth
  #   # addTask(taskName: String!, description: String!): Task
  # }
`;

module.exports = typeDefs;

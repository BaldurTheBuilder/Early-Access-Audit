const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID
    name: String
    isEarlyAccess: Boolean
    everEarlyAccess: Boolean
    originalRelease: String
    updatedRelease: String
    lastUpdate: String
    developer: String
    publisher: String
    steam_appid: Int
    totalFunding: Int
    earlyAccessFunding: Int
  }

  type SteamGame {
    name: String
    steam_appid: Int
    developer: String
    publisher: String
    isEarlyAccess: Boolean
    release_date: String
  }

  type Query {
    games: [Game]!
    singleSteamGame(steam_appid: Int!): SteamGame
    singleApiGame(steam_appid: Int!): Game
  }

  type Mutation {
    updateGame(steam_appid: Int!): Game
    addGame(
      name: String
      isEarlyAccess: Boolean
      everEarlyAccess: Boolean
      originalRelease: String
      updatedRelease: String
      lastUpdate: String
      developer: String
      publisher: String
      steam_appid: Int
      totalFunding: Int
      earlyAccessFunding: Int
    ): Game
  }
`;

module.exports = typeDefs;

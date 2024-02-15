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
    developer: String
    publisher: String
    isEarlyAccess: Boolean
    release_date: String
  }

  type Query {
    games: [Game]!
    singleGame(steam_appid: Int!): SteamGame
  }

  # type Mutation {
  #   addGame(appId: String!, ): Game
  #   updateGame(): Game
  # }
`;

module.exports = typeDefs;

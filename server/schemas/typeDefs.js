const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID
    name: String
    isAGame: Boolean
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

  type Publisher {
    publisherName: String
    publisherGames: [Int]
    earlyAccessTrackRecord: String
  }

  type Developer {
    developerName: String
    developerGames: [Int]
    earlyAccessTrackRecord: String
  }

  type Query {
    games: [Game]!
    singleSteamGame(steam_appid: Int!): SteamGame
    singleApiGame(steam_appid: Int!): Game
    
    # find the publisher/developer, populate their array of gameIds with the relevant names
    publishedGames(publisherName: String!): Publisher
    developedGames(developerName: String!): Developer
  }

  type Mutation {
    updateGame(steam_appid: Int!): Game
    addGame(steam_appid: Int!): Game
    processGame(steam_appid: Int!): Game

    createPublisher(publisherName: String!, publisherGame: Int, earlyAccessTrackRecord: String): Publisher
    updatePublisher(publisherName: String!, publisherGame: Int, earlyAccessTrackRecord: String): Publisher

    createDeveloper(developerName: String!, developerGame: Int, earlyAccessTrackRecord: String): Developer
    updateDeveloper(developerName: String!, developerGames: Int, earlyAccessTrackRecord: String): Developer

  }
`;

module.exports = typeDefs;

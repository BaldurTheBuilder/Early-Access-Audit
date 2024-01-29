const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID
    gameTitle: String
    appId: Number
    originalRelease: Date
    updatedRelease: Date
    lastUpdate: Date
    developer: String
    publisher: String
    totalFunding: Number
    earlyAccessFunding: Number
    earlyAccessCurrent: Boolean
    earlyAccessEver: Boolean
  }
  type Query {
    # users: [User]!
    games: [Game]!
    # unclaimedTasks: [Task]
    game(appId: String!): [Game]!
  }

  # type Auth {
  #   token: ID!
  #   user: User
  # }

  type Mutation {
    # addGame(appId: String!, ): Game
    # updateGame(): Game

    # updateImage(projectTitle: String!, image: String!): Project
  #   # addUser(username: String!, email: String!, password: String!, firstName: String!): Auth
  #   # login(email: String!, password: String!): Auth
  #   # addTask(taskName: String!, description: String!): Task
  }
`;

module.exports = typeDefs;

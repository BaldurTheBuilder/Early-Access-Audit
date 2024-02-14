require('dotenv').config();
const express = require ("express");
const path = require("path");

const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require('./auth/auth');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}   

// Create a new instance f an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);


/*
1) User enters a value in the search bar.
2) The value is passed to my API.
3) My API checks whether the value is in the database.
4) If my database returns a value, then we have already seen the game.
  5) If the game doesn't have the early access tag, return the information we have for the game.
  6) If the game DOES have the early access tag, AND we haven't updated the game in the past 7 days, send a server-side GET request to the steam api to update any information.
7) If my database doesn't return a value, then we haven't seen this game before.
8) Send a server-side GET request to the steam api to update my information.

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
        const FetchSteam = async () => {
          let fetchingURL = "https://store.steampowered.com/api/appdetails?appids=892970";
          const response = await fetch(fetchingURL);
          const data = await response.json();
          return data;
        }
        return FetchSteam();
      // }


      AXIOS
*/




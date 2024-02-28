const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: {
    type: String
  },
  steam_appid: {
    type: Number,
    required:
      "We need to know the game's ID to see if it's already been queried.",
    unique: true,
  },
  isAGame: {
    type: Boolean,
    required: "We need to know if this is a game or something else.",
    default: true,
  },
  originalRelease: {
    type: Date,
    default: Date.now,
  },
  updatedRelease: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  developer: {
    type: String,
  },
  publisher: {
    type: String,
  },
  totalFunding: {
    type: Number,
  },
  earlyAccessFunding: {
    type: Number,
  },
  isEarlyAccess: {
    type: Boolean,
  },
  everEarlyAccess: {
    type: Boolean,
  }
});

const Game = model("Game", gameSchema);
module.exports = Game;

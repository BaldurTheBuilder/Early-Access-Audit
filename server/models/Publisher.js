const { Schema, model } = require("mongoose");

const publisherSchema = new Schema({
  publisherName: {
    type: String
  },
  // array of the ID's of published games
  publisherGames: {
    type: [Number],
  },
  earlyAccessTrackRecord: {
    type: String
  }
});

const Publisher = model("Publisher", publisherSchema);
module.exports = Publisher;

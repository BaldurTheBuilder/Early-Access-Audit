const { Schema, model } = require("mongoose");

const publisherSchema = new Schema({
  publisherName: {
    type: String
  },
  publisherGames: {
    type: [Number],
  },
  earlyAccessTrackRecord: {
    type: String
  }
});

const Publisher = model("Publisher", publisherSchema);
module.exports = Publisher;

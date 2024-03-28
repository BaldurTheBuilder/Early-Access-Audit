const { Schema, model } = require("mongoose");

const developerSchema = new Schema({
    developerName: {
        type: String
      },
      developerGames: {
        type: [Number],
      },
      earlyAccessTrackRecord: {
        type: String
      }
});

const Developer = model("Developer", developerSchema);
module.exports = Developer;

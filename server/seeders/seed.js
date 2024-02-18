// Template for apiGame seed data
// {
//     "name": "",
//     "steam_appid": 0,
//     "developer": "",
//     "publisher": "",
//     "isEarlyAccess": ,
//     "everEarlyAccess": ,
//     "originalRelease": "",
//     "updatedRelease": "",
//     "lastUpdate": "",
//     "totalFunding": 0,
//     "earlyAccessFunding": 0
// },

require('dotenv').config();
const db = require("../config/connection");
const { Game } = require("../models");

const gameSeeds = require('./gameSeeds.json');

db.once('open', async () => {
    try{
        await Game.deleteMany({});
        await Game.create(gameSeeds);

    } catch (err) {
        console.error(err);
        process.exit(1);
      }
    
      console.log('all done!');
      process.exit(0);
});
// Template for project seed data
// {
//     "projectTitle": "",
//     "briefDescription": "",
//     "detailedDescription": "",
//     "techUsed": ["",""],
//     "repoLink": "",
//     "liveLink": "",
//     "projectImage": ""
// }

require('dotenv').config();
const db = require("../config/connection");

const { User, Project } = require("../models");

// const userSeeds = require('./userSeeds.json');
const projectSeeds = require('./projectSeeds.json');
db.once('open', async () => {
    try{
        // await User.deleteMany({});
        await Project.deleteMany({});
        // await User.create(userSeeds);

        for (let index = 0; index < projectSeeds.length; index++) {
            // const { _id, projectTitle, briefDescription, detailedDescription, techUsed, repoLink, liveLink } = 
            await Project.create(projectSeeds[index]);

            // update authoring user's list of created tasks
            // const authors = await User.findOneAndUpdate(
            //     { username: taskAuthor  },
            //     {
            //         $addToSet: {
            //             createdTasks: _id
            //         }
            //     }
            // );
            
            // update assigned user's list of assigned tasks
            // const assigned = await User.findOneAndUpdate(
            //     { username: assignedUser},
            //     {
            //         $addToSet: {
            //             assignedTasks: _id
            //         }
            //     }
            // );

            // cycle through the array of watching users
            // update each watching user's list of watched tasks
            // for (let jndex = 0; jndex < watchingUsers.length; jndex++) {
            //     const watchingUser = await User.findOneAndUpdate(
            //         { username: watchingUsers[jndex]},
            //         {
            //             $addToSet: {
            //                 watchedTasks: _id
            //             }
            //         }
            //     )
            // };

            // cycle through the array of funding users
            // update each funding user's list of funded tasks
            // update each funding user's funding for that task
            // for (let jndex = 0; jndex < fundingUsers.length; jndex++) {
            //     console.log(`currently seeding ${fundingUsers[jndex].username}'s funded tasks. _id is: ${_id}.`)
            //     const fundingUser = await User.findOneAndUpdate(
            //         { username: fundingUsers[jndex].username},
            //         {
            //             $addToSet: {
            //                 fundedTasks: _id,
            //                 // funding: fundingUsers[jndex].funding
            //             },
            //         }
            //     )
            // }

        }


    } catch (err) {
        console.error(err);
        process.exit(1);
      }
    
      console.log('all done!');
      process.exit(0);
});
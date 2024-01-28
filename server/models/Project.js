const { Schema, model } = require('mongoose');

// image storage needed
// intending on storing images as base 64 encoded strings

const projectSchema = new Schema({
    projectTitle: {
      type: String,
      required: "Your project needs a title!",
      unique: true
    },
    dateAdded: { 
      type: Date, 
      default: Date.now 
    },
    dateLastWorkedOn: {
      type: Date, 
      default: Date.now 
    },
    detailedDescription: {
      type: String,
      required: "Your project needs a detailed description!",
    },
    briefDescription: {
      type: String,
      required: "Your project needs a brief description!",
    },
    techUsed: [],
    repoLink: {
      type: String,
      required: "Your project needs a linked Repo."
    },
    liveLink: {
      type: String
    },
    image: {
      type: String
    }
    // currentFunding: {
    //   type: Number,
    //   default: 0.0,
    //   min: 0.0,
    // },
    // fundingUsers: [
    //   {
    //     username: {type: String},
    //     funding: {type: String}
    //   }
    // ]
  });

  const Project = model('Project', projectSchema);
  module.exports = Project;
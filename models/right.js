const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model to implement the business action security
// a project contains roles, and a user could have one to many roles
const rightSchema = new Schema({
  project     : { type: String },
  user        : { type: String },
  roles       : [{ type: String }]
});

// Create the model class
const ModelClass = mongoose.model('right', rightSchema);

// Export the model
module.exports = ModelClass;
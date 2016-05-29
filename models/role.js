const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model to implement the business action security
// a project contains roles, and a user could have one to many roles
const roleSchema = new Schema({
  name        : { type: String },
  description : { type: String }, 
  actions     : [ { type: String } ] ,
});

// Create the model class
const ModelClass = mongoose.model('role', roleSchema);

// Export the model
module.exports = ModelClass;
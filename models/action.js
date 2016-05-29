const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const actionSchema = new Schema({
  name        : { type: String },
  description : { type: String }
});
// Create the model class
const ModelClass = mongoose.model('action', actionSchema);

// Export the model
module.exports = ModelClass;

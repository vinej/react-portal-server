const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const actionSchema = new Schema({
  name        : { type: String },
  description : { type: String }
});
// Create the model class
module.exports = mongoose.model('action', actionSchema);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const todoSchema = new Schema({
  desc: { type: String }, 
  date: { type: String }
});

// Create the model class
const ModelClass = mongoose.model('todo', todoSchema);

// Export the model
module.exports = ModelClass;

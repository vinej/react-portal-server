const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const todoSchema = new Schema({
  description : { type: String,   default : '' }, 
  startDate   : { type: Date,     default : Date.now },
  endDate     : { type: Date,     default : Date.now },
  color       : { type: String,   default : 'green' },
  category    : { type: String,   default : 'standard '},
  status      : { type: String,   default : 'waiting' },
  done        : { type: Boolean , default : false }
});

// Create the model class
const ModelClass = mongoose.model('todo', todoSchema);

// Export the model
module.exports = ModelClass;
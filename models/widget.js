const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const widgetSchema = new Schema({
  title       : { type: String },
  i           : { type: String },
  x           : { type: Number },
  y           : { type: Number }, 
  w           : { type: Number },
  h           : { type: Number }
});

// Create the model class
module.exports = mongoose.model('widget', widgetSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const widgetSchema = new Schema({
  name        : { type: String },
  i           : { type: String },
  x           : { type: Number },
  y           : { type: Number }, 
  w           : { type: Number },
  h           : { type: Number }
});

// Define our model
const dashboardSchema = new Schema({
  title       : { type: String },
  userid      : { type: String },
  project     : { type: String },
  widgets     : [widgetSchema] 
});

// Create the model class
module.exports = mongoose.model('dashboard', dashboardSchema);

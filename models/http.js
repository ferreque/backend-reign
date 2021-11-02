const { Schema, model } = require("mongoose");

const HitsSchema = new Schema({
  created_at: {
    type: Date,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  _tags: {
    type: Array,
  },
});

module.exports = model("Hits", HitsSchema);

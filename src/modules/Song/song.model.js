const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "default",
  },
  title: {
    type: String,
    required: true,
  },
  album: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "albums",
  },
  artwork: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
});
const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;

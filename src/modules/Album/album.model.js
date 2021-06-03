const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  typeAlbum: {
    type: String,
  },
  name: {
    type: String,
  },
  artist: {
    type: String,
    required: true,
  },
  suggestion: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "suggestions",
  },
});

const albumModel = mongoose.model("albums", albumSchema);
module.exports = albumModel;

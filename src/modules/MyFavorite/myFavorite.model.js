const mongoose = require("mongoose");
const myFavoriteSchema = new mongoose.Schema({
  _idUser: {},
  listSong: {},
});
const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;

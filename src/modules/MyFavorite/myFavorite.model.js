const mongoose = require("mongoose");
const myFavoriteSchema = new mongoose.Schema({
  _idUser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
  listSong: {
    type: Array,
    default: [],
  },
});
const myFavoriteModel = mongoose.model("myFavorite", myFavoriteSchema);

module.exports = myFavoriteModel;

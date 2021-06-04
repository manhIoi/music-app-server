const songModel = require("./song.model");

const songService = {
  async getAllSong() {
    return await songModel.find({}).populate({
      path: "album",
      select: ["_id", "name", "artist", "suggestion"],
    });
  },
  async createSong(newSong) {
    return await songModel.create(newSong);
  },

  async getSongByAlbumId(idAlbum) {
    const allSong = await songModel.find({ album: idAlbum }).populate({
      path: "album",
      select: ["_id", "name", "artist", "suggestion"],
    });

    return allSong;
  },
};

module.exports = songService;

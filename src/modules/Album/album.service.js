const albumModel = require("./album.model");

const albumService = {
  async getAllAlbum() {
    return await albumModel.find({}).populate({
      path: "suggestion",
      select: ["_id", "title"],
    });
  },
  async createAlbum(newAlbum) {
    return await albumModel.create(newAlbum);
  },
  async getAlbumBySuggestion(idSuggestion) {
    const allAlbum = await albumModel.find({ suggestion: idSuggestion });
    return allAlbum;
  },
};

module.exports = albumService;

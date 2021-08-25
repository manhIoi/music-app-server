const myFavoriteModel = require("./myFavorite.model");
const myFavoriteService = {
  async getAllMyFavorite() {
    return await myFavoriteModel.find({});
  },
  async createMyFavoriteById(idUser) {
    return await myFavoriteModel.create({ _idUser: idUser });
  },
  async addToMyFavorite(idUser, newSong) {
    const myFavoriteUser = await myFavoriteModel.findOne({ _idUser: idUser });

    if (myFavoriteUser) {
      const songExist = myFavoriteUser.listSong.find(
        song => song._id === newSong._id
      );
      if (songExist) return { message: "Song is already in album" };

      return await myFavoriteModel.findOneAndUpdate(
        { _idUser: idUser },
        {
          $set: {
            listSong: [...myFavoriteUser.listSong, newSong],
          },
        },
        { new: true }
      );
    } else {
      return { message: "User not found" };
    }
  },
  async removeFromMyFavorite(idUser, idSong) {
    const myFavoriteUser = await myFavoriteModel.findOne({ _idUser: idUser });

    if (myFavoriteUser) {
      const resultListSong = myFavoriteUser.listSong.filter(
        song => song._id !== idSong
      );

      return await myFavoriteModel.findOneAndUpdate(
        { _idUser: idUser },
        {
          $set: {
            listSong: resultListSong,
          },
        },
        { new: true }
      );
    } else {
      return { message: "User not found" };
    }
  },
  async getMyFavoriteByUser(idUser) {
    const result = await myFavoriteModel.findOne({ _idUser: idUser });
    return result;
  },
  async removeAllMyFavorite() {
    return await myFavoriteModel.remove({});
  },
};

module.exports = myFavoriteService;

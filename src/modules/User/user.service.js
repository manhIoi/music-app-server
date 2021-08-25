const userModel = require("./user.model");
const userService = {
  async getAllAccount() {
    return await userModel.find({});
  },
  async createAccount(newAccount) {
    return await userModel.create(newAccount);
  },
  async findAccount(query) {
    return await userModel.findOne(query);
  },
  async checkPassword(idUser, password) {
    const currentUser = userModel.findOne({ _id: idUser });
    if (!currentUser) {
      return null;
    }
    if (currentUser.password === password) {
      return true;
    }
    return false;
  },
  async updatePassword(idUser, password) {
    return await userModel.findOneAndUpdate(
      { _id: idUser },
      {
        $set: {
          password: password,
        },
      },
      { new: true }
    );
  },
  async updateInfo(idUser, data) {
    return await userModel.findOneAndUpdate(
      {
        _id: idUser,
      },
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );
  },
  async removeAllUser() {
    return await userModel.remove({});
  },
};

module.exports = userService;

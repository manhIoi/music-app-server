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
};

module.exports = userService;

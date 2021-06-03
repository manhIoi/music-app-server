const suggestionsModel = require("./suggestion.model");

const suggestionService = {
  async getAllSuggestion() {
    return await suggestionsModel.find({});
  },
  async createSuggestion(newSuggestion) {
    return await suggestionsModel.create(newSuggestion);
  },
};

module.exports = suggestionService;

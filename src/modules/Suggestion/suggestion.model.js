const mongoose = require("mongoose");

const suggestionsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const suggestionModel = mongoose.model("suggestions", suggestionsSchema);

module.exports = suggestionModel;

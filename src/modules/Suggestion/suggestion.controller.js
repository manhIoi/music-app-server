const suggestionService = require("./suggestion.service");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const body = await suggestionService.getAllSuggestion();

    return res.json(body);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newSuggestion = req.body;
    const body = await suggestionService.createSuggestion(newSuggestion);
    return res.json(body);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;

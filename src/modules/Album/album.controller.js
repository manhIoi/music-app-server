const albumService = require("./album.service");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const body = await albumService.getAllAlbum();
    return res.json(body);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newAlbum = req.body;
    const body = await albumService.createAlbum(newAlbum);
    return res.json(body);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

router.get("/getByIdSuggestion/:idSuggestion", async (req, res) => {
  try {
    const { idSuggestion } = req.params;
    const body = await albumService.getAlbumBySuggestion(idSuggestion);
    return res.json(body);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

module.exports = router;

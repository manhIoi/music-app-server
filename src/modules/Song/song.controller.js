const songService = require("./song.service");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const body = await songService.getAllSong();
    return res.json(body);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newSong = req.body;
    const body = await songService.createSong(newSong);

    return res.json(body);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getSongsByIdAlbum/:idAlbum", async (req, res) => {
  try {
    const { idAlbum } = req.params;
    const body = await songService.getSongByAlbumId(idAlbum);
    return res.json(body);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;

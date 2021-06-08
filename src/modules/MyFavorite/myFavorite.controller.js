const router = require("express").Router();
const myFavoriteService = require("./myFavorite.service");

router.get("/", async (req, res) => {
  try {
    const body = await myFavoriteService.getAllMyFavorite();
    return res.json(body);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/create/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const body = await myFavoriteService.createMyFavoriteById(idUser);
    return res.json(body);
  } catch (error) {
    return res.send(error.message);
  }
});

router.put("/update/addToMyFavorite/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const newSong = req.body;
    const body = await myFavoriteService.addToMyFavorite(idUser, newSong);
    if (body.message) {
      return res.send(body.message);
    }
    return res.json(body);
  } catch (error) {
    return res.send(error.message);
  }
});
router.put("/update/removeFromMyFavorite/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { idSong } = req.body;
    const body = await myFavoriteService.removeFromMyFavorite(idUser, idSong);
    if (body.message) {
      return res.send(body.message);
    }
    return res.json(body);
  } catch (error) {
    return res.send(error.message);
  }
});

router.get("/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const body = await myFavoriteService.getMyFavoriteByUser(idUser);
    if (!body._id) {
      return res.send("Not found");
    }
    return res.json(body);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;

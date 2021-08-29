const router = require("express").Router();
const userService = require("./user.service");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const auth = require("../../middleware/verifyToken");
const myFavoriteService = require("../MyFavorite/myFavorite.service");
const dotenv = require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const body = await userService.getAllAccount();
    return res.json(body);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const newAccount = req.body;

    const emailExist = await userService.findAccount({
      email: newAccount.email,
    });
    if (emailExist) {
      return res.send("Email đã tồn tại ! ");
    }

    // hash password
    const saltRounds = 10;
    const passwordHassed = await bcrypt.hash(newAccount.password, saltRounds);
    if (passwordHassed) {
      const body = await userService.createAccount({
        ...newAccount,
        password: passwordHassed,
      });
      return res.json({ body });
    }
  } catch (error) {
    const { errors } = error;
    return res.send(errors[Object.keys(errors)[0]].message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let account = req.body;
    // check account

    if (account.authToken) {
      console.log("Login with token");
      const token = account.authToken;
      account = await jwt.verify(token, process.env.TOKEN);
    }

    const emailAlready = await userService.findAccount({
      email: account.email,
    });
    if (!emailAlready) {
      return res.send("Không tìm thấy email");
    }
    const isPassword = await bcrypt.compare(
      account.password,
      emailAlready.password
    );
    if (!isPassword) {
      return res.send("Sai mật khẩu");
    }

    const token = jwt.sign(
      {
        _id: emailAlready._id,
        email: emailAlready.email,
        password: account.password,
      },
      process.env.TOKEN
    );

    return res.json({ emailAlready, authToken: token });
  } catch (error) {
    return res.json(error);
  }
});

router.put("/checkPassword", auth, async (req, res) => {
  try {
    const { password, _id } = req.body;
    const currentUser = await userService.findAccount({
      _id,
    });
    if (!currentUser) {
      return res.status(404).send("Không tìm thấy người dùng");
    }
    const result = await bcrypt.compare(password, currentUser.password);
    if (result) {
      return res.json(currentUser);
    }
    return res.send("Mật khẩu không chính xác");
  } catch (error) {
    return res.json(error);
  }
});

router.put("/changePassword", auth, async (req, res) => {
  try {
    const { newPassword, authToken } = req.body;
    const data = await jwt.verify(authToken, process.env.TOKEN);
    if (!data._id) {
      return res.send("Error token");
    }

    const passwordHassed = await bcrypt.hash(newPassword, 10);
    const result = await userService.updatePassword(data._id, passwordHassed);

    const newToken = jwt.sign(
      {
        _id: result._id,
        email: result.email,
        password: newPassword,
      },
      process.env.TOKEN
    );

    return res.json({ authToken: newToken });
  } catch (error) {
    return res.json(error);
  }
});

router.put("/updateInfo", auth, async (req, res) => {
  try {
    const { idUser, data } = req.body;
    const result = await userService.updateInfo(idUser, data);
    console.log(result);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// router.delete("/deleteAllUser", async (req, res) => {
//   try {
//     const result = await myFavoriteService.removeAllMyFavorite();
//     const result2 = await userService.removeAllUser();
//     return res.json({ result, result2 });
//   } catch (error) {
//     return res.json(error);
//   }
// });

module.exports = router;

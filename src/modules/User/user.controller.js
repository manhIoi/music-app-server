const router = require("express").Router();
const userService = require("./user.service");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
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
      return res.status(400).send("Email already exist! ");
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

router.get("/login", async (req, res) => {
  try {
    const account = req.body;
    // check account

    const emailAlready = await userService.findAccount({
      email: account.email,
    });
    if (!emailAlready) {
      return res.status(400).send("Email is not found");
    }
    const isPassword = await bcrypt.compare(
      account.password,
      emailAlready.password
    );
    if (!isPassword) {
      return res.status(400).send("Password is incorrect");
    }

    const token = jwt.sign({ _id: emailAlready._id }, process.env.TOKEN);

    return res.json({ emailAlready, authToken: token });
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;

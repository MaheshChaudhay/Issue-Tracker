const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getSignUp(req, res) {
  return res.render("signup", {
    error: null,
  });
}

async function signUp(req, res) {
  const name = req.body.name.trim();
  const email = req.body.email;
  if (name.length == 0) {
    return res.status(400).json({
      error: "Name cannot be empty",
    });
  }
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    return res.status(201).json({
      user: newUser._id,
    });
  } catch (err) {
    console.log(err);
    let error = "Internal Server Error";
    if (err.code == 11000) {
      error = "Email already registered..";
    }
    return res.status(400).json({
      error: error,
    });
  }
}

async function getLogin(req, res) {
  const cookies = req.cookies;
  return res.render("login");
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Email Doesn't Exist..",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, "issue tracker secret", {
        expiresIn: 24 * 60 * 60,
      });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).json({
        user: user._id,
      });
    }
    return res.status(400).json({
      error: "Email or Password Is Incorrect",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

function logout(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.redirect("/");
}

module.exports = {
  getLogin,
  getSignUp,
  logout,
  signUp,
  login,
};

const jwt = require("jsonwebtoken");
const User = require("./models/user");

function checkAuthentication(req, res, next) {
  const token = req.cookies["jwt"];
  if (token) {
    jwt.verify(token, "issue tracker secret", (err, decodedToken) => {
      if (err) {
        return res.redirect("/users/login");
      }
      return next();
    });
  } else {
    return res.redirect("/users/login");
  }
}

function notAuthenticated(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  } else {
    return res.redirect("/");
  }
}

function checkUser(req, res, next) {
  const token = req.cookies["jwt"];
  if (token) {
    jwt.verify(token, "issue tracker secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        return next();
      }
      const userId = decodedToken.id;
      const user = await User.findById(userId);
      req.user = user;
      res.locals.user = user;
      return next();
    });
  } else {
    res.locals.user = null;
    return next();
  }
}

module.exports = {
  checkAuthentication,
  checkUser,
  notAuthenticated,
};

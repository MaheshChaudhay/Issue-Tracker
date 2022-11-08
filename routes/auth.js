const express = require("express");

const router = express.Router();

const authController = require("./../controllers/auth");
const { notAuthenticated, checkAuthentication } = require("./../utils");

router.get("/signup", notAuthenticated, authController.getSignUp);
router.post("/signup", authController.signUp);
router.get("/login", notAuthenticated, authController.getLogin);
router.post("/login", authController.login);
router.get("/logout", checkAuthentication, authController.logout);

module.exports = router;

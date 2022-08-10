const express = require("express");
const router = express.Router();

const loginHandlers = require('./../controllers/loginController')
//Routes

router.route("/").post(loginHandlers.loginUser);

module.exports = router;

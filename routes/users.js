const express = require('express');
const router = express.Router();

const userValidator = require("../validators/userValidator");
const userController = require("../controllers/userController");

router.post('/login', userValidator.login, userController.login);
router.post('/signin', userValidator.signin, userController.signin);
router.post('/refresh_token', userValidator.refreshToken, userController.refreshToken);

module.exports = router;
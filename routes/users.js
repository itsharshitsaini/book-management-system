const express = require('express');
const router = express.Router();

// const Joi = require('joi');
const userValidator = require("../validators/userValidator");
const userController = require("../controllers/userController");


router.post('/login',   userValidator.login,     userController.login);
router.post('/signin',  userValidator.signin,   userController.signin);
router.post('/refresh-token',   userController.refreshToken);
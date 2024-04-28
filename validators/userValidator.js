const joi = require('joi');
const responses = require('../utility/reponses');
const constants = require('../utility/constants');

exports.login = (req, res, next) => {
    const loginSchema = joi.object({
        username: joi.string().required().trim().min(6).max(15),
        password: joi.string().required().trim().min(6).max(15)
    });
    const validationResult = validateFields(req, res, loginSchema);
    if (validationResult) {
        next();
    }
};

exports.signin = (req, res, next) => {
    const loginSchema = joi.object({
        name: joi.string().required().trim().min(2).max(30),
        username: joi.string().required().trim().min(6).max(15),
        password: joi.string().required().trim().min(6).max(15),
        email: joi.string().email().required(),
        age: joi.number().required()
    });
    const validationResult = validateFields(req, res, loginSchema);
    if (validationResult) {
        next();
    }
};

exports.refreshToken = (req, res, next) => {
    const loginSchema = joi.object({
        refresh_token: joi.string().required(),
        username: joi.string().required()
    });
    const validationResult = validateFields(req, res, loginSchema);
    if (validationResult) {
        next();
    }
};

validateFields = (req, res, schema) => {
    console.log({ REQUEST_BODY: req.body });
    const validation = schema.validate(req.body);
    if (validation.error) {
        var errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';
        responses.sendResponse(res, errorReason, constants.responseFlags.PARAMS_MISSING);
        return false;
    }
    return true;
};
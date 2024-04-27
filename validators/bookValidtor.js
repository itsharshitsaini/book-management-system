const joi = require("jsonwebtoken");
const responses = require("../utility/reponses");

exports.getBook = (req, res, next) => {
    const addBookSchema = Joi.object().keys({
        author: joi.string().optional().trim().min(2).max(15),
        publication_year: joi.string().optional().trim().min(4).max(4),
        token : joi.string.required()
    });
    const validationResult = validateFields(req, res, addBookSchema);
    if (validationResult) {
        next();
    }
};

exports.addBook = (req, res, next) => {
    const addBookSchema = Joi.object().keys({
        title: joi.string().required().trim().min(2).max(30),
        author: joi.string().required().trim().min(6).max(15),
        publication_year: joi.string().required().trim().min(4).max(4),
        token : joi.string.required()
    });
    const validationResult = validateFields(req, res, addBookSchema);
    if (validationResult) {
        next();
    }
};

exports.updateBook = (req, res, next) => {
    const updateBookSchema = Joi.object().keys({
        book_id : joi.number().required(),
        token : joi.string.required(),
        update_obj : joi.object.keys({
            title: joi.string().optional().trim().min(2).max(30),
            author: joi.string().optional().trim().min(6).max(15),
            publication_year: joi.string().optional().trim().min(4).max(4)
        }).optional().min(1)
    });
    const validationResult = validateFields(req, res, updateBookSchema);
    if (validationResult) {
        next();
    }
};

exports.deleteBook = (req, res, next) => {
    const deleteBookSchema = Joi.object().keys({
        book_id : joi.number().required(),
        token : joi.string.required()
    });
    const validationResult = validateFields(req, res, updateBookSchema);
    if (validationResult) {
        next();
    }
};

const validateFields = (req, res, schema) => {
    console.log({ REQUEST_BODY: req });
    const validation = joi.validate(req, schema);
    if (validation.error) {
        var errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';
        responses.sendResponse(res, errorReason, constants.responseFlags.PARAMETER_MISSING);
        return false;
    }
    return true;
};
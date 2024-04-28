const joi = require("joi");
const responses = require("../utility/reponses");
const constants = require("../utility/constants");

exports.getBook = (req, res, next) => {
    try {
        const addBookSchema = joi.object({
            author: joi.string().optional().trim().min(2).max(15),
            publication_year: joi.string().optional().trim().min(4).max(4),
        });
        const validationResult = validateFields(req.query, res, addBookSchema);
        if (validationResult) {
            next();
        }
    } catch (error) {
        console.log({ ERROR: error });
        responses.sendError(res);
    }
};

exports.addBook = (req, res, next) => {
    try {
        const addBookSchema = joi.object({
            name: joi.string().required().trim().min(2).max(30),
            author: joi.string().required().trim().min(6).max(15),
            publication_year: joi.string().required().trim().min(4).max(4),
        });
        const validationResult = validateFields(req.body, res, addBookSchema);
        if (validationResult) {
            next();
        }
    }
    catch (error) {
        console.log(error);
        responses.sendError(res);
    }
};

exports.updateBook = (req, res, next) => {
    try {

        const updateBookSchema = joi.object({
            book_id: joi.number().required(),
            update_obj: joi.object({
                name: joi.string().optional().trim().min(2).max(30),
                author: joi.string().optional().trim().min(2).max(15),
                publication_year: joi.string().optional().trim().min(4).max(4)
            })
        });
        const validationResult = validateFields(req.body, res, updateBookSchema);
        if (validationResult) {
            next();
        }
    }
    catch (error) {
        console.log(error);
        responses.sendError(res);
    }
};

exports.deleteBook = (req, res, next) => {
    const deleteBookSchema = joi.object({
        book_id: joi.number().required()
    });
    const validationResult = validateFields(req.body, res, deleteBookSchema);
    if (validationResult) {
        next();
    }
};

const validateFields = (req, res, schema) => {
    try {
        const validation = schema.validate(req);
        if (validation.error) {
            var errorReason =
                validation.error.details !== undefined
                    ? validation.error.details[0].message
                    : 'Parameter missing or parameter type is wrong';
            responses.sendResponse(res, errorReason, constants.responseFlags.PARAMS_MISSING);
            return false;
        }
        return true;
    }
    catch (error) {
        console.log(error);
        return responses.sendError(res);
    }
};
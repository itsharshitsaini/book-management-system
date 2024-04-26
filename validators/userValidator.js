const joi = require('joi');
const responses = require('../reponses');


// Define the schema for login validation

  
//   // Middleware function to validate login data
//   const validateLogin = (req, res, next) => {
//     const { error } = loginSchema.validate(req.body);
//     if (error) {
//       // Validation failed, send error response
//       return res.status(400).json({ error: error.details[0].message });
//     }
//     // Validation passed, proceed to the next middleware
//     next();
//   };

exports.login = (req, res, next) => {
    const loginSchema = Joi.object({
        name : joi.string().required().trim().min(2).max(30),
        username: joi.string().required().trim().min(6).max(15),
        password: joi.string().required().trim().min(6).max(15)
    });
    const validationResult =  validateFields(req,res,loginSchema);
    if (validationResult) {
        next();
    }

};


validateFields =  (req, res, schema) => {
    console.log({REQUEST_BODY: req});
    const validation = joi.validate(req, schema);
    if(validation.error) {
        var errorReason =
                    validation.error.details !== undefined
                    ? validation.error.details[0].message
                    : 'Parameter missing or parameter type is wrong';
        responses.sendResponse(res,errorReason, constants.responseFlags.PARAMETER_MISSING);
        return false;
    }
    return true;
};
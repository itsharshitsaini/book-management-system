const commonFunctions = require("../utility/commonFunctions");
const _ = require("underscore");
const responses = require("../utility/reponses");


exports.decodeToken = (req,res,next)=> {
    // extract token from query 

    const headers = fetchAccessToken(req.headers);

    if (_.isEmpty(headers)) {
        return responses.sendError(res,);
    }
    
    const userId = commonFunctions.verifyAccessToken(headers || req.body.token);
    if (_.isEmpty(userId)) {
        return responses.sendResponse(res,"Verficiation failed",400);
    }

    req.body.user_id = userId;
    delete req.body.token;
    next();
}



function fetchAccessToken(headers) {
    if (headers && headers.authorization) {
        const authHeader = headers.authorization;
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
            return parts[1];
        }
    }
    return null;
}
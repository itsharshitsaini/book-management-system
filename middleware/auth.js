const commonFunctions = require("../utility/commonFunctions");
const _ = require("underscore");
const responses = require("../utility/reponses");
const responseFlags = require("../utility/constants").responseFlags;
const responseMessages = require("../utility/constants").responseMessages;

exports.decodeToken = (req, res, next) => {
    try {
        const headers = extractToken(req.headers);
        if (_.isEmpty(headers)) {
            return responses.sendError(res,responseFlags.INVALID_ACCESS_TOKEN,responseMessages.INVALID_ACCESS_TOKEN);
        }
        const userId = commonFunctions.verifyAccessToken(headers);
        if (!userId) {
            return responses.sendError(res, responseFlags.INVALID_ACCESS_TOKEN, responseMessages.INVALID_ACCESS_TOKEN);
        }
        req.user = { user_id: userId };
        return next();
    } catch (error) {
        console.log("Error in token verification middleware:", error);
        return responses.sendError(res, responseFlags.INVALID_ACCESS_TOKEN, responseMessages.INVALID_ACCESS_TOKEN);
    }
};

function extractToken(headers) {
    try {

        if (headers && headers.authorization) {
            const authHeader = headers.authorization;
            const parts = authHeader.split(' ');
            if (parts[0].toLowerCase() === 'bearer') {
                return parts[parts.length-1];
            }
        }
        return null;
    }
    catch (error) {
        console.log("Error while extracting token :", error);
        throw new error;
    }
};
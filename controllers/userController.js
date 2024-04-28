const _ = require('underscore');
const responses = require('../utility/reponses');
const userService = require("../services/userService");
const commonFunctions = require('../utility/commonFunctions');
const responseFlags = require("../utility/constants").responseFlags;
const responseMessages = require("../utility/constants").responseMessages;

exports.signin = async (req, res) => {
    try {
        const { username, name, age, email, password } = req.body;
        const userDetails = await userService.getExistingUser({
            username: username,
            email: email
        });

        if (!_.isEmpty(userDetails)) {
            let message;
            if (userDetails[0].username == username) {
                message = responseMessages.USERNAME_EXIST;
            }
            else message = responseMessages.EMAIL_EXIST;
            return responses.sendResponse(res, message, responseFlags.CONFLICT);
        }
        const userId = await userService.getUserID();
        const accessToken = await commonFunctions.generateAccessToken(userId);
        const refreshToken = await commonFunctions.generateRefreshToken(userId);

        const refreshTokenHash = await commonFunctions.generateArgon2Hash(refreshToken);
        const passwordHash = await commonFunctions.generateArgon2Hash(password);

        await userService.addUser({
            user_id: userId.user_id + 1,
            username: username,
            name: name,
            email: email,
            age: age,
            refresh_token: refreshTokenHash,
            password: passwordHash
        });

        return responses.actionCompleteResponse(res, {
            refreshToken,
            accessToken
        });
    }
    catch (error) {
        console.log(error);
        return responses.sendResponse(res, error.message);
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        let userDetails = await userService.getUser({
            username: username
        });
        userDetails = userDetails[0];
        if (_.isEmpty(userDetails)) {
            return responses.sendError(res, responseFlags.UNAUTHORIZED, responseMessages.UNAUTHORIZED);
        }

        await commonFunctions.verifyArgon2Hash({ hash: userDetails.password, word: password });
        let tokenObj = { user_id: userDetails.user_id };
        const accessToken = await commonFunctions.generateAccessToken(tokenObj);
        const refreshToken = await commonFunctions.generateRefreshToken(tokenObj);

        const refreshTokenHash = await commonFunctions.generateArgon2Hash(refreshToken);

        await userService.updateRefreshToken({
            refresh_token: refreshTokenHash,
            user_id: userDetails.user_id
        });

        return responses.actionCompleteResponse(res, {
            refreshToken,
            accessToken
        });
    }
    catch (error) {
        console.log(error);
        return responses.sendError(res, error);
    }
};



exports.refreshToken = async (req, res) => {
    try {
        const { refresh_token: refreshToken, username: username } = req.body;
        let userDetails = await userService.getUser({
            username: username
        });
        userDetails = userDetails[0];
        await commonFunctions.verifyArgon2Hash({ hash: userDetails.refresh_token, word: refreshToken });
        let tokenObj = { user_id: userDetails.user_id };
        const newAccessToken = await commonFunctions.generateAccessToken(tokenObj);
        return responses.actionCompleteResponse(res, {
            access_token: newAccessToken
        });
    } catch (error) {
        console.log(error);
        return responses.sendError(res, error);
    }
};
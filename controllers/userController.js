const _ = require('underscore');
const responses = require('../utility/reponses');
const userService = require("../services/userService");
const commonFunctions = require('../utility/commonFunctions');

exports.signin = async (req, res) => {
    try {
        const { username, name, age, email, password } = req.body;
        const userDetails = await userService.getUser({
            username: username,
            email: email
        });

        if (!_.isEmpty(userDetails)) {
            // check if email in use or username in use 
            let msg = "user already exist";
            return responses.sendResponse(res, "user already exist", 409);
        }

        const accessToken = await commonFunctions.generateAccessToken(user.userId);
        const refreshToken = await commonFunctions.generateRefreshToken(user.userId);

        const refreshTokenHash = await commonFunctions.createArgon2Hash(refreshToken);
        const passwordHash = await commonFunctions.createArgon2Hash(password);

        await userService.addUser({
            username: username,
            name: name,
            email: email,
            age: age,
            refresh_token: refreshTokenHash,
            password : passwordHash
        });

        return responses.actionCompleteResponse(res, {
            refreshToken,
            accessToken
        });

    }
    catch (error) {
        return responses.sendResponse(res, error || "unable to add user", 409);
    }
} 

// TODO: HASH THE PASSWORDS AND TOKENS 

exports.login = async (req, res) => {
    try {
        const { username, password} = req.body;

        const passwordHash = await commonFunctions.createArgon2Hash(password);

        const userDetails = await userService.getUser({
            username: username,
            password: passwordHash
        });

        if (_.isEmpty(userDetails)) {
            return responses.sendResponse(res, "check password or username");
        }
        
        const accessToken = await commonFunctions.generateAccessToken(user.userId);
        const refreshToken = await commonFunctions.generateRefreshToken(user.userId);

        const refreshTokenHash = await commonFunctions.createArgon2Hash(refreshToken);

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
        return responses.sendResponse(res, error || "unable to add user", 409);
    }
};



exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const token = await commonFunctions.verifyRefreshToken(refreshToken);
        if (!token) {
            return responses.sendResponse(res, 'Invalid refresh token', 401);
        }
        const userDetails = await userService.getUser({ userId });
        if (!userDetails) {
            return responses.sendResponse(res, 'User not found', 404);
        }
        const newAccessToken = await commonFunctions.generateAccessToken(userId);
        return responses.actionCompleteResponse(res, {
            accessToken: newAccessToken
        });
    } catch (error) {
        return responses.sendResponse(res, error.message, 500);
    }
};
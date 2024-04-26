const _ = require('underscore');
const responses = require('../reponses');
const userService = require("../services/userService");
const commonFunctions = require('../utility/commonFunctions');

exports.signin = async (req, res) => {
    try {
        const { username, name, age, email } = req.body;
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

        await userService.addUser({
            username: username,
            name: name,
            email: email,
            age: age,
            refresh_token: refreshToken
        });

        return responses.sendActionCompleteResponse(res, {
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
        const userDetails = await userService.getUser({
            username: username,
            password: password
        });

        if (_.isEmpty(userDetails)) {
            return responses.sendResponse(res, "check password or username");
        }
        
        const accessToken = await commonFunctions.generateAccessToken(user.userId);
        const refreshToken = await commonFunctions.generateRefreshToken(user.userId);

        await userService.addUser({
            update_items: {
                refresh_token: refreshToken
            },
            user_id: userDetails.user_id
        });

        return responses.sendActionCompleteResponse(res, {
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
  
      const userId = await commonFunctions.verifyRefreshToken(refreshToken);

      if (!userId) {
        return responses.sendResponse(res, 'Invalid refresh token', 401);
      }
  
      // Get the user details from the database
      const userDetails = await userService.getUser({ userId });
  
      // Check if the user exists
      if (!userDetails) {
        return responses.sendResponse(res, 'User not found', 404);
      }
  
      const newAccessToken = await commonFunctions.generateAccessToken(userId);
  
      return responses.sendActionCompleteResponse(res, {
        accessToken: newAccessToken
      });
    } catch (error) {
      return responses.sendResponse(res, error.message, 500);
    }
};
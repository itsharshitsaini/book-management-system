const jwt = require('jsonwebtoken');

exports.generateAccessToken = async (opts) => {
    try {
        return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }
    catch (error) {
        throw new Error("unable to generate access token");
    }
}

exports.generateRefreshToken = async (opts) => {
    try {
        return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' });
    }
    catch (error) {
        throw new Error("unable to generate refresh token");
    }
}

exports.verifyRefreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

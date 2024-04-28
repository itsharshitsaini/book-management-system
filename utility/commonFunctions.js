const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { response } = require('express');

exports.generateAccessToken = (accessToken) => {
    try {
        return jwt.sign(accessToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45m' });
    }
    catch (error) {
        console.log(error);
        throw new Error("unable to generate access token");
    }
}

exports.generateRefreshToken = (refreshToken) => {
    try {
        return jwt.sign(refreshToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' });
    }
    catch (error) {
        console.log(error);
        throw new Error("unable to generate refresh token");
    }
}

exports.verifyRefreshToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return decoded.user_id;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.verifyAccessToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return decoded.user_id;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.generateArgon2Hash = async (word) => {
    try {
        const hash = await argon2.hash(word);
        return hash;
    }
    catch (error) {
        console.log("Eroor generating hashing ", error);
    }
}

exports.verifyArgon2Hash = async (opts) => {
    try {
        if (await argon2.verify(opts.hash, opts.word)) {
            return true;
        }
        throw new Error("Error");
    }
    catch (error) {
        console.log("Erorr verifying hashing ", error);
        throw error;
    }
}
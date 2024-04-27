const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { response } = require('express');

exports.generateAccessToken = async (accessToken) => {
    try {
        return await jwt.sign(accessToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }
    catch (error) {
        throw new Error("unable to generate access token");
    }
}

exports.generateRefreshToken = async (refreshToken) => {
    try {
        return await jwt.sign(refreshToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' });
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

exports.verifyAccessToken = async (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

exports.createArgon2Hash = async (word) => {
    try {
        const hash = await argon2.hash(word);
        return hash;
    }
    catch (error) {
        console.log("Eroor in argon 2 hashing ", error);
    }
}
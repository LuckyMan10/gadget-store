const jwt = require("jsonwebtoken");
const tokenModel = require("../models/tokenModel");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, "89892374mnIOAUSND97", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, "09nuioSAD89n796353", {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, "89892374mnIOAUSND97");
      return userData;
    } catch (e) {
      throw e;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, "09nuioSAD89n796353");
      return userData;
    } catch (e) {
      throw e;
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();

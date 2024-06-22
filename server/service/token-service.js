const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
class TokenService {
  generateTokens({ ...payload }) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId, refreshToken) {
    const token = await tokenModel.findOne({ user: userId});
    if (token) {
      token.refreshToken = refreshToken;
      return await token.save();
    }
    const newToken = await tokenModel.create({ user: userId, refreshToken });
    return await newToken.save();
  }

  async removeToken(refreshToken) {
    const token = await tokenModel.deleteOne({ refreshToken });
    return token;
  }

  validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(token) {
    return await tokenModel.findOne({ refreshToken: token });
  }
}

module.exports = new TokenService();

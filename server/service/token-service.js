const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
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
    const token = await tokenModel.findOne({ user: userId });
    if (token) {
      token.refreshToken = refreshToken;
      return await token.save();
    }
    const newToken = await tokenModel.create({ user: userId, refreshToken });
    return await newToken.save();
  }
}

module.exports = new TokenService();

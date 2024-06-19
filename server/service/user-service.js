const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const UserDTO = require("../dtos/user-dto");
const tokenService = require("./token-service");
const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("user with such email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const activationLink = uuid.v4();
    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMain(
      email,
      process.env.API_URL + "/api/activate/" + activationLink
    );
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    await tokenService.saveRefreshToken(userDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDTO,
    };
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw  ApiError.BadRequest("User is not found");
    }
    user.isActivated = true;
    return await user.save();
  }
}

module.exports = new UserService();

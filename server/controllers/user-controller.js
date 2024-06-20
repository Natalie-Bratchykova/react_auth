const userService = require("../service/user-service");
const ApiError = require("../exceptions/api-error");
const { validationResult } = require("express-validator");
const userModel = require("../models/user-model");
class UserController {
  async registration(req, res, next) {
    try {
      const er = validationResult(req);
      if (!er.isEmpty()) {
        return next(ApiError.BadRequest("Input wrong credentials", er.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("RefreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("RefreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { RefreshToken } = req.cookies;
      const token = await userService.logout(RefreshToken);
      res.clearCookie("RefreshToken");
      res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { RefreshToken } = req.cookies;
      const userData = await userService.refresh(RefreshToken);
      res.cookie("RefreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

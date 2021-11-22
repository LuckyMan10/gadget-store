const User = require("../models/userModel");
const userService = require("../service/userService");


class authController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw "Ошибка. Недостаточно данных для регистрации.";
      }
      const userData = await userService.loginProcess({ email, password });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (e) {
      console.log("login error: ", e);
    }
  }
  async registration(req, res) {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        throw "Ошибка. Недостаточно данных для регистрации.";
      }
      const userData = await userService.registrationProcess({
        email,
        password,
        username,
      });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      console.log("registration error: ", e);
    }
  }
  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logoutProcess({refreshToken});
      res.clearCookie("refreshToken");
      return res.status(200).json(token);
    } catch (e) {
      console.log("logout error: ", e);
    }
  }
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refreshProcess({refreshToken});
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      console.log("refresh error: ", e);
    }
  }
}

module.exports = new authController();

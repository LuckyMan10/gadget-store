const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const FavList = require("../models/favoriteListModel");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/userDto");
const tokenService = require("./tokenService");

class userService {
  async registrationProcess({ email, username, password }) {
    try {
      const candidate = await User.findOne({ email });
      if (candidate) {
        throw "Пользователь с такой почтой уже существует.";
      }
      const hashPassword = await bcrypt.hash(password, 2);
      const user = await User.create({
        email,
        username,
        password: hashPassword,
      });
      if (user && user._id) {
        const cart = await Cart.create({
          userId: user._id,
        });
        const favList = await FavList.create({
          userId: user._id,
        });
      }
      if (!(user && user._id)) {
        throw "Произошла ошибка при регистрации. Повторите попытку позже.";
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch (e) {
      console.log("registrationProcess error: ", e);
      throw e;
    }
  }
  async loginProcess({ email, password }) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw "Пользователь с таким email не найден";
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        throw "Неверный пароль";
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch (e) {
      console.log("loginProcess error: ", e);
      throw e;
    }
  }
  async refreshProcess({ refreshToken }) {
    try {
    if (!refreshToken) {
      throw "Требуется авторизация";
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw "Требуется авторизация";
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
    } catch(e) {
      console.log("refreshProcess error: ", e)
      throw e;
    }
  }
  async logoutProcess({refreshToken}) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new userService();

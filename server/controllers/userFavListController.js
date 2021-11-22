const User = require("../models/userModel");
const FavoriteList = require("../models/favoriteListModel");
const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");
const tokenService = require("../service/tokenService");

class userFavListController {
  async getFavList(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const userFavList = await FavoriteList.find({ userId: decoded.id });
      return res.json(userFavList);
    } catch (e) {
      console.log("getFavList error: ", e);
      return res.json({ message: e });
    }
  }

  async updateFavList(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const { updateItem } = req.body;
      if (!updateItem) {
        throw "Ошибка. Отсутствует товар, который нужно добавить в избранное.";
      }
      const favoriteList = await FavoriteList.find({ userId: decoded.id });
      const newItem = favoriteList[0].favoriteList.filter(
        (el) => el.productId === updateItem.productId
      );
      if (!newItem[0]) {
        await FavoriteList.findOneAndUpdate(
          { userId: decoded.id },
          {
            $push: {
              favoriteList: updateItem,
            },
          }
        );
        const updatedFavList = await FavoriteList.find({ userId: decoded.id });
        return res.json(updatedFavList);
      }
      if (newItem[0]) {
        throw "Данный продукт уже есть в списке избранных.";
      }
    } catch (e) {
      console.log("createFavList error: ", e);
      return res.json({ message: e });
    }
  }
  async deleteFavList(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const { id } = req.query;
      if (!id) {
        return res.json({ message: "Недостаточно информации для удаления." })
      }
      const favList = await FavoriteList.find({ userId: decoded.id });
      const favListItem = favList[0].favoriteList.filter(
        (el) => el.productId === id
      );
      await FavoriteList.findOneAndUpdate(
        { userId: decoded.id },
        {
          $pull: {
            favoriteList: { productId: id },
          },
        }
      );
      const updatedFavList = await FavoriteList.find({ userId: decoded.id });
      return res.json(updatedFavList);
    } catch (e) {
      console.log("deleteFavList error: ", e);
      return res.json({ message: e });
    }
  }
}

module.exports = new userFavListController();



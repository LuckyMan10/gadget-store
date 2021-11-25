const User = require("../models/userModel");
const FavoriteList = require("../models/favoriteListModel");
const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");
const tokenService = require("../service/tokenService");
const Product = require("../models/productModel");

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
      const { productId } = req.body;
      if (!productId) {
        throw "Ошибка. Необходимо указать id товара.";
      }
      const favoriteList = await FavoriteList.find({ userId: decoded.id });
      const product = await Product.find({ id: productId });
      if(!product[0]) {
        throw "Указан id несуществующего продукта.";
      }
      const newItem = favoriteList[0].products.filter(
        (el) => el.productId === productId
      );
      if (!newItem[0]) {
        const favList = await FavoriteList.findOneAndUpdate(
          { userId: decoded.id },
          {
            $push: {
              products: {productId, product: product[0] },
            },
          }, {new: true}
        );
        return res.json(favList);
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
      const favList = await FavoriteList.findOneAndUpdate(
        { userId: decoded.id },
        {
          $pull: {
            products: { productId: id },
          },
        }, {new: true}
      );
      return res.json(favList);
    } catch (e) {
      console.log("deleteFavList error: ", e);
      return res.json({ message: e });
    }
  }
}

module.exports = new userFavListController();



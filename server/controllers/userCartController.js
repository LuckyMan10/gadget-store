const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");
const tokenService = require("../service/tokenService");

class userController {
  async getUserCart(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const userCart = await Cart.find({ userId: decoded.id });
      return res.json(userCart);
    } catch (e) {
      console.log("getUserCart error: ", e);
      return res.json({ message: e });
    }
  }
  async updateUserCart(req, res) {
    try {
      const quantity_values = {
        DECREMENT: "DECREMENT",
        INCREMENT: "INCREMENT",
      };
      function isChangeQuantity(type, value, quantity_values) {
        if (type === quantity_values.DECREMENT && value > 1) {
          return -1;
        }
        if (type === quantity_values.DECREMENT && !(value > 1)) {
          return 0;
        }
        if (type === quantity_values.INCREMENT) {
          return 1;
        }
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const { updateItem, type } = req.body;
      const cart = await Cart.find({ userId: decoded.id });
      console.log("cart: ", cart);
      const newItem = cart[0].products.filter(
        (el) => el.productId === updateItem.productId
      );
      if (!newItem[0]) {
        await Cart.findOneAndUpdate(
          { userId: decoded.id },
          {
            $push: {
              products: updateItem,
            },
          }
        );
        const updatedCart = await Cart.find({ userId: decoded.id });
        return res.json(updatedCart);
      }
      if (newItem[0]) {
        if (!type) {
          throw "Необходимо указать type (INCREMENT или DECREMENT)";
        }
        if (!quantity_values[type]) {
          throw "Неизвестный type. Допустимые значения INCREMENT или DECREMENT.";
        }
        await Cart.findOneAndUpdate(
          { userId: decoded.id, "products.productId": updateItem.productId },
          {
            $inc: {
              "products.$.quantity": isChangeQuantity(
                type,
                newItem[0].quantity,
                quantity_values
              ),
            },
          }
        );
        const updatedCart = await Cart.find({ userId: decoded.id });
        return res.json(updatedCart);
      }
    } catch (e) {
      console.log("updateUserCart error: ", e);
      return res.json({ message: e });
    }
  }
  async deleteUserCart(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const { id } = req.query;
      if (!id) {
        throw "Недостаточно информации для удаления.";
      }
      const cart = await Cart.find({ userId: decoded.id });
      const cartItem = cart[0].products.filter((el) => el.productId === id);
      await Cart.findOneAndUpdate(
        { userId: decoded.id },
        {
          $pull: {
            products: { productId: id },
          },
        }
      );
      const updatedCart = await Cart.find({ userId: decoded.id });
      return res.json(updatedCart);
    } catch (e) {
      console.log("deleteUserCart: ", e);
      return res.status(400).json({ message: e });
    }
  }
}

module.exports = new userController();

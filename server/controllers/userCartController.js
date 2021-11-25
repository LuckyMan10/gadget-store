const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const tokenService = require("../service/tokenService");

class userController {
  async getUserCart(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = tokenService.validateAccessToken(token);
      const userCart = await Cart.find({ userId: decoded.id });
      console.log("cart: ", userCart);
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
      const { type, productId } = req.body;
      if (!type || !productId) {
        throw "Недостаточно данных для занесения в корзину.";
      }
      const product = await Product.find({ id: productId });
      if (!product[0]) {
        throw "Указан id несуществующего продукта.";
      }
      const userCart = await Cart.find({ userId: decoded.id });
      const check = userCart[0].products.filter(
        (el) => el.product.id === productId
      );
      if (!check[0]) {
        const newItem = await Cart.findOneAndUpdate(
          { userId: decoded.id },
          {
            $push: {
              products: { quantity: 1, productId, product: product[0] },
            },
          }, {new: true}
        );
        return res.json(newItem);
      }
      if (check[0]) {
        if (!type) {
          throw "Необходимо указать type (INCREMENT или DECREMENT)";
        }
        if (!quantity_values[type]) {
          throw "Неизвестный type. Допустимые значения INCREMENT или DECREMENT.";
        }
        const newItem = await Cart.findOneAndUpdate(
          { userId: decoded.id, "products.productId": productId },
          {
            $inc: {
              "products.$.quantity": isChangeQuantity(
                type,
                check[0].quantity,
                quantity_values
              ),
            },
          }, {new: true}
        );
        return res.json(newItem);
      }
    } catch (e) {
      console.log("updateUserCart error: ", e);
      return res.status(400).json({ message: e });
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
      const update = await Cart.findOneAndUpdate(
        { userId: decoded.id },
        {
          $pull: {
            products: { productId: id },
          },
        }, {new: true}
      );
      return res.json(update);
    } catch (e) {
      console.log("deleteUserCart: ", e);
      return res.status(400).json({ message: e });
    }
  }
}

module.exports = new userController();

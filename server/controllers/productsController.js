const Product = require("../models/productModel");
const navBar = require("../models/navbarModel");
const Carousel = require("../models/carouselModel");

class productController {
  async findById(req, res) {
    try {
      const { id } = req.query;
      if(!id) {
          throw "Id не найден.";
      }
      const product = await Product.find({id});
      res.status(200).json(product);
    } catch (e) {
      console.log("findById error: ", e);
      res.status(500).json(e);
    }
  }
  async getCategory(req, res) {
    try {
      const {name} = req.query;
      if(!name) {
        throw "Ошибка. Не указана категория.";
      }
      const products = await Product.find({category: name});
      res.status(200).json(products);
    } catch(e) {
      console.log("getCategory error: ", e);
      res.status(500).json(e);
    }
  }
  async searchBar(req, res) {
    try {
      const { price, companies, category } = req.body;
      if(!category || !price || !companies) {
        throw "Недостаточно данных для сортировки."
      }
      const products = await Product.find({
        $and: [{ price: { $gte: price[0] } }, { price: { $lte: price[1]} }, {company: {$in: companies}}, {category} ],
      });
      res.status(200).json(products);
    } catch (e) {
        console.log("searchBar error: ", e);
        res.status(500).json(e);
    }
  }
  async getAll(req, res) {
      try {
          const products = await Product.find();
          res.status(200).json(products);
      } catch(e) {
          console.log("getAll error: ", e);
          res.status(500).json(e);
      }
  }

  async carouselData(req, res) {
      try {
        const {type} = req.query;
        if(!type) {
          throw "Ошибка. Указан несуществующий тип слайдера."
        }
        const slider = await Carousel.find({slider: type});
        res.status(200).json(slider);
      } catch(e) {
          console.log("carouselData error: ", e);
          res.status(500).json(e);
      }
  }
  async navData(req, res) {
      try {
          const navbarData = await navBar.find();
          res.status(200).json(navbarData);
      } catch(e) {
          console.log("navData error: ", e);
          res.status(500).json(e);
      }
  }
}

module.exports = new productController();

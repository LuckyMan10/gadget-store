const Product = require("../models/productModel");
const navBar = require("../models/navbarModel");
const Carousel = require("../models/carouselModel");
const Companies = require("../models/companyModel");

class productController {
  async findById(req, res) {
    try {
      const { id } = req.query;
      if (!id) {
        throw "Id не найден.";
      }
      const product = await Product.find({ id });
      res.status(200).json(product);
    } catch (e) {
      console.log("findById error: ", e);
      res.status(500).json(e);
    }
  }
  async findByIdArray(req, res) {
    try {
      const {id_list} = req.query;
      const idArray = id_list.split(",");
      const products = await Product.find({
        $and: [
          {id: {$in: idArray}}
        ]
      });
      return res.json(products);
    } catch(e) {
      console.log("findByIdArray error: ", e);
      res.status(500).json(e);
    }
  }
  async getCategory(req, res) {
    try {
      const { name, company } = req.query;
      console.log(name, company)
      if (!name) {
        throw "Ошибка. Не указана категория.";
      }
      if (name && !company) {
        const products = await Product.find({ category: name });
        return res.json(products);
      }
      if (name && company) {
        const products = await Product.find({ category: name, company });
        console.log(products)
        return res.json(products);
      }
    } catch (e) {
      console.log("getCategory error: ", e);
      res.status(500).json(e);
    }
  }
  async searchBar(req, res) {
    try {
      const { price, companies, category } = req.query;
      if (!category || !price || !companies) {
        throw "Недостаточно данных для сортировки.";
      }
      const company_list = companies.split("-");
      const price_arr = price.split("-");
      const products = await Product.find({
        $and: [
          { price: { $gte: Number(price_arr[0]) } },
          { price: { $lte: Number(price_arr[1]) } },
          { company: { $in: company_list } },
          { category },
        ],
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
    } catch (e) {
      console.log("getAll error: ", e);
      res.status(500).json(e);
    }
  }

  async carouselData(req, res) {
    try {
      const { type } = req.query;
      if (!type) {
        throw "Ошибка. Указан несуществующий тип слайдера.";
      }
      if (type === "companySlider") {
        const companies = await Companies.find();
        return res.json(companies);
      }
      const slider = await Carousel.find({ slider: type });
      res.status(200).json(slider);
    } catch (e) {
      console.log("carouselData error: ", e);
      res.status(500).json(e);
    }
  }
  async navData(req, res) {
    try {
      const navbarData = await navBar.find();
      res.status(200).json(navbarData);
    } catch (e) {
      console.log("navData error: ", e);
      res.status(500).json(e);
    }
  }
}

module.exports = new productController();

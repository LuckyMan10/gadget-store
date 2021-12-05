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
  async searchField(req, res) {
    try {
      const {query} = req.query;
      if(!query) {
        throw "Недостаточно данных для фильтрации.";
      };
      const name = query.toLowerCase();
      const findByCategory = await navBar.find({name});
      if(findByCategory[0]) {
        const category = findByCategory[0].category;
        console.log(category)
        const products = await Product.find({category});
        return res.json({products, category});
      }
      if(!findByCategory[0]) {
        const company = query.toUpperCase();
        const findByCompany = await Product.find({company});
        if(findByCompany[0]) {
          const productCategory = findByCompany[0].category;
          return res.json({products: findByCompany, category: productCategory, company});
        }
        if(!findByCompany[0]) {
          const findByName = await Product.find({$text: {$search: query}});
          return res.json({products: []});
        }
      }
      return res.json({message: "Ничего не найдено."})
    } catch(e) {
      console.log("searchField error: ", e);
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
      console.log({price, companies, category})
      let company_list = companies.split("%");
      if(company_list.length === 1) {
        company_list[0] = company_list[0].replace(/ /g, "");
      }
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

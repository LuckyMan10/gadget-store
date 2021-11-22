const Router = require("express");
const productsController = require("../controllers/productsController");
const router = new Router();

router.get("/find", productsController.findById);
router.get("/searchBar", productsController.searchBar);
router.get("/category", productsController.getCategory);
router.get("/all", productsController.getAll);

router.get("/navData", productsController.navData);
router.get("/carouselData", productsController.carouselData);

module.exports = router;
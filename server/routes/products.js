const Router = require("express");
const productsController = require("../controllers/productsController");
const apiAccessCheck = require("../middleware/apiAccessCheckMiddleware");
const router = new Router();

router.get("/find", apiAccessCheck, productsController.findById);
router.get("/findList", apiAccessCheck, productsController.findByIdArray);
router.get("/searchBar", apiAccessCheck, productsController.searchBar);
router.get("/category", apiAccessCheck, productsController.getCategory);
router.get("/all", apiAccessCheck, productsController.getAll);

router.get("/navData", apiAccessCheck, productsController.navData);
router.get("/carouselData", apiAccessCheck, productsController.carouselData);

module.exports = router;
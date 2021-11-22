const Router = require("express");
const userCartController = require("../controllers/userCartController");
const userFavListController = require("../controllers/userFavListController");
const checkAuth = require("../middleware/checkAuthMiddlewares");
const router = new Router();


router.get("/cart", checkAuth, userCartController.getUserCart);
router.put("/cart", checkAuth, userCartController.updateUserCart); // IF THE ITEM IN THE BASKET REQUIRED INCREMENT OR DECREMENT TYPE
router.delete("/cart", checkAuth, userCartController.deleteUserCart);

router.get("/favoriteList", checkAuth, userFavListController.getFavList);
router.put("/favoriteList", checkAuth, userFavListController.updateFavList);
router.delete("/favoriteList", checkAuth, userFavListController.deleteFavList)

module.exports = router;

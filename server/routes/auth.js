const Router = require("express");
const authController = require("../controllers/authController");
const middleware = require("../middleware/authMiddlewares");
const router = new Router();

router.post("/login", middleware.loginCheck, authController.login);
router.post("/registration", middleware.registrationCheck, authController.registration);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);

module.exports = router;

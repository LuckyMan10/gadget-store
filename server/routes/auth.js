const Router = require("express");
const authController = require("../controllers/authController");
const middleware = require("../middleware/authMiddlewares");
const apiAccessCheck = require("../middleware/apiAccessCheckMiddleware");
const router = new Router();

router.post(
  "/login",
  apiAccessCheck,
  middleware.loginCheck,
  authController.login
);
router.post(
  "/registration",
  apiAccessCheck,
  middleware.registrationCheck,
  authController.registration
);
router.get("/logout", apiAccessCheck, authController.logout);
router.get("/refresh", apiAccessCheck, authController.refresh);

module.exports = router;

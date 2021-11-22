const Router = require('express');
const router = new Router();
const authRouter = require("./auth");
const productsRouter = require("./products");
const userRouter = require("./user");

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/user", userRouter);

module.exports = router;

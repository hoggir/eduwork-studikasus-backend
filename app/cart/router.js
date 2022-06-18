const router = require("express").Router();
const { police_check } = require("../../middlewares");
const multer = require("multer");
var getFields = multer();
const cartController = require("./newcarcontroller");

router.post(
  "/carts",
  getFields.any(),
  police_check("create", "Cart"),
  cartController.store
);

router.get("/carts", police_check("read", "Cart"), cartController.index);

module.exports = router;

const router = require("express").Router();
const { police_check } = require("../../middlewares");
const multer = require("multer");
var getFields = multer();
const cartController = require("./controller");

router.post(
  "/carts",
  police_check("create", "Cart"),
  cartController.store
);

router.get("/carts", police_check("read", "Cart"), cartController.index);
router.delete(
  "/carts-item/:id",
  police_check("delete", "Cart"),
  cartController.destroy
);

router.delete(
  "/carts/:id",
  police_check("delete", "Cart"),
  cartController.deletecart
);

module.exports = router;

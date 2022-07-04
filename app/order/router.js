const router = require("express").Router();
const { police_check } = require("../../middlewares");
const orderController = require("./controller");
const multer = require("multer");
var getFields = multer();

router.post("/orders", police_check("create", "Order"), orderController.store);

router.get("/orders", police_check("view", "Order"), orderController.index);

router.get("/orders/:id", police_check("view", "Order"), orderController.getone);

module.exports = router;

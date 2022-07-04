const router = require("express").Router();
const { police_check } = require("../../middlewares");
const deliveryController = require("./controller");

router.post(
  "/delivery-addresses",
  police_check("create", "DeliveryAddress"),
  deliveryController.store
);

router.put("/delivery-addresses/:id", deliveryController.update);
router.delete("/delivery-addresses/:id", deliveryController.destroy);

router.get(
  "/delivery-addresses",
  police_check("view", "DeliveryAddress"),
  deliveryController.index
);

module.exports = router;
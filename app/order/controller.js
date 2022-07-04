const Order = require("../order/newmodel");
const Cart = require("../cart/model");
const DeliveryAddress = require("../deliveryAddress/model");

const store = async (req, res, next) => {
  const userId = req.user._id;
  const { deliveryaddressId, status, delivery_fee, bill } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let address = await DeliveryAddress.findOne({ _id: deliveryaddressId });
    const provinsi = address.provinsi;
    const kabupaten = address.kabupaten;
    const kecamatan = address.kecamatan;
    const kelurahan = address.kelurahan;
    const name = address.name;

    // products: [{ productId, quantity, price, name, image_url }],
    if (cart) {
      const order = await Order.create({
        userId: req.user._id,
        products: cart.products,
        delivery_address: { name, kelurahan, kecamatan, kabupaten, provinsi },
        status: status,
        delivery_fee: delivery_fee,
        bill: bill,
      });
      const data = await Cart.findByIdAndDelete({ _id: cart.id });
      return res.status(201).send(order);
    } else {
      return res.json({
        error: 1,
        message: "You do not have items in cart",
      });
      //res.status(500).send("You do not have items in cart");
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const userId = req.user._id;
    Order.find({ userId })
      .sort({ date: -1 })
      .then((orders) => res.json(orders));
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const getone = async (req, res, next) => {
  const userId = req.user._id;
  let { id } = req.params;
  try {
    let orders = await Order.find({ userId });

    if (orders) {
      let order = await Order.findById(id);
      return res.json(order);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  store,
  index,
  getone,
};

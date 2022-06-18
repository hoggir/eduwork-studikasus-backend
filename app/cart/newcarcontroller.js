const { subject } = require("@casl/ability");
const Cart = require("./model");
const Product = require("../product/model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;

    let cart = await Cart.findOne({ user: user._id });
    if (cart) {
      if (payload.products && payload.products.length > 0) {
        let products = await Product.find({ _id: { $in: payload.products } });

        if (products.length) {
          payload = {
            ...payload,
            products: products.map((product) => product._id),
          };
        } else {
          delete payload.product;
        }
        cart.products = payload.products;
        cart.qty = payload.qty;
        cart.price = payload.price;
        cart = await cart.save();
        return res.json(cart);
      } else {
        return res.json({
          error: 1,
          message: "Food dalam cart kosong!",
        });
      }
    } else {
      if (payload.products && payload.products.length > 0) {
        let products = await Product.find({ _id: { $in: payload.products } });
        if (products.length) {
          payload = {
            ...payload,
            products: products.map((product) => product._id),
          };
        } else {
          delete payload.product;
        }
        let newCarts = await Cart.create({ ...payload, user: user._id });
        return res.json(newCarts);
      } else {
        return res.json({
          error: 1,
          message: "Food dalam cart kosong!",
        });
      }
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
    let user = req.user;
    let items = await Cart.find({ user: user._id }).populate("products");

    return res.json(items);
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
};

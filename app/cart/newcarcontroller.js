const { subject } = require("@casl/ability");
const { policyFor } = require("../../utils");
const Cart = require("./model");
const Product = require("../product/model");

const store = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    const price = item.price;
    const name = item.name;
    const image_url = item.image_url;

    //CEK APAKAH USER SUDAH ADA CART
    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        //PRODUK ADA DI CART, "UPDATE QUANTITY"
        let productItem = cart.products[itemIndex];
        productItem.quantity += parseInt(quantity);
        cart.products[itemIndex] = productItem;
      } else {
        //PRODUK TIDAK ADA DI CART >>> BUAT ITEM BARU (CART)
        cart.products.push({ productId, quantity, price, name, image_url });
      }
      cart = await cart.save();
      // return res.json({ message: "Food berhasil dihapus", cart });
      return res.json(cart);
    } else {
      //USER TIDAK PUNYA CART >>> BUAT CART BARU
      const newCart = await Cart.create({
        userId: req.user._id,
        products: [{ productId, quantity, price, name, image_url }],
      });

      return res.status(201).send(newCart);
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
    let items = await Cart.find({ userId: user._id }).populate("products");

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

const destroy = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      cart.products.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  next(err);
};

const deletecart = async (req, res, next) => {
  try {
    let { id } = req.params;
    let cart = await Cart.findById(id);
    let subjectCart = subject("Cart", {
      ...cart,
      user_id: cart.userId,
    });
    let policy = policyFor(req.user);
    if (!policy.can("delete", subjectCart)) {
      return res.json({
        error: 1,
        message: `You're not allowed to modify this resource`,
      });
    }

    cart = await Cart.findByIdAndDelete(id);
    return res.json(cart);
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
  destroy,
  deletecart,
};
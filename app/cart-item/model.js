const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    minlength: [5, "Panjang minimal 5 karakter"],
    required: [true, "name must be filed"],
  },

  qty: {
    type: Number,
    min: [1, "Minimal qty adalah 1"],
    required: [true, "qty harus diisi"],
  },

  price: {
    type: Number,
    default: 0,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("CartItem", cartItemSchema);

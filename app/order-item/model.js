const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    minlength: [5, "Panjang minimal 5 karakter"],
    required: [true, "name must be filed"],
  },

  price: {
    type: Number,
    required: [true, 'Harga harus diisi']
  },

  qty: {
    type: Number,
    min: [1, "Minimal qty adalah 1"],
    required: [true, "qty harus diisi"],
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },

  order: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
  }
});

module.exports = model("OrderItem", orderItemSchema);

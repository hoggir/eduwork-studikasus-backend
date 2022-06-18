const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const CartSchema = Schema(
  {
    qty: {
      type: Number,
      min: [1, "Minimal qty adalah 1"],
      required: [true, "qty harus diisi"],
    },

    price: {
      type: Number,
      default: 0,
      required: [true, "price harus diisi"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Cart", CartSchema);

// {
//   qty: {
//     type: Number,
//     min: [1, "Minimal qty adalah 1"],
//     required: [true, "qty harus diisi"],
//   },

//   price: {
//     type: Number,
//     default: 0,
//     required: [true, "price harus diisi"],
//   },

//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },

//   products: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//     },
//   ],
// },

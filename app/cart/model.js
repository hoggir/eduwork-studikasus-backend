const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },

        name: {
          type: String,
          required: [true, "name harus diisi"],
        },

        image_url: String,

        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less then 1."],
          default: 1,
        },

        price: {
          type: Number,
          required: [true, "price harus diisi"],
        },
      },
    ],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
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

const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    delivery_address: {
      provinsi: { type: String, required: [true, "provinsi harus diisi!"] },
      kabupaten: { type: String, required: [true, "kabupaten harus diisi!"] },
      kecamatan: { type: String, required: [true, "kecamatan harus diisi!"] },
      kelurahan: { type: String, required: [true, "kelurahan harus diisi!"] },
      name: { type: String },
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

    status: {
      type: String,
      enum: ["waiting_payment", "processing", "in_delivery", "delivered"],
      default: ["waiting_payment"],
    },

    delivery_fee: {
      type: Number,
      default: 0,
    },

    bill: {
      type: Number,
      required: true,
    },

    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);

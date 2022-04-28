const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const deliveryAddressSchema = Schema(
  {
    name: {
      type: String,
      maxlength: [255, "Panjang nama alamat maksimal 255 karakter"],
      required: [true, "Nama alamat harus diisi"],
    },

    kelurahan: {
      type: String,
      maxlength: [255, "Panjang kelurahan maksimal 255 karakter"],
      required: [true, "Kelurahan harus diisi"],
    },

    kecamatan: {
      type: String,
      maxlength: [255, "Panjang kecamatan maksimal 255 karakter"],
      required: [true, "Kecamatan harus diisi"],
    },

    kabupaten: {
      type: String,
      maxlength: [255, "Panjang kabupaten maksimal 255 karakter"],
      required: [true, "Kabupaten harus diisi"],
    },

    provinsi: {
      type: String,
      maxlength: [255, "Panjang provinsi maksimal 255 karakter"],
      required: [true, "Provinsi harus diisi"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeliveryAddress", deliveryAddressSchema);

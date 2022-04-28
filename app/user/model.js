const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

let userSchema = Schema(
  {
    full_name: {
      type: String,
      minlength: [3, "Panjang nama harus antara 3 - 255 karakter"],
      maxlength: [225, "Panjang nama harus antara 3 - 255 karakter"],
      required: [true, "Nama harus diisi"],
    },

    customer_id: {
      type: Number,
    },

    email: {
      type: String,
      maxlength: [225, "Panjang email maksimal 255 karakter"],
      required: [true, "Email harus diisi"],
    },

    password: {
      type: String,
      minlength: [3, "Panjang password minimal 3 karakter"],
      maxlength: [225, "Panjang password maksimal 255 karakter"],
      required: [true, "Password harus diisi"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    token: [String],
  },
  { timestamps: true }
);

userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid!`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").count({ email: value });

      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);

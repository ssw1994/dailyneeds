const { Schema, model } = require("mongoose");
const { CartModel, WishModel } = require("./cart.model");
const { ProfileModel } = require("./profile.model");
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: false,
  },
  cartId: { type: Schema.Types.ObjectId, ref: "Carts" },
  wishId: { type: Schema.Types.ObjectId, ref: "Wishs" },
  profile: { type: Schema.Types.ObjectId, ref: "Profiles" },
});

UserSchema.pre("save", function (next) {
  const Cart = new CartModel({ products: [] });
  Cart.save()
    .then((response) => {
      this.cartId = response._id;
      const Wish = new WishModel({ products: [] });
      Wish.save().then((response) => {
        this.wishId = response?._id;
        next();
      });
    })
    .catch((error) => {
      next();
      return;
    });
});

UserSchema.post("save", function (next) {
  try {
    const Profile = new ProfileModel();
    Profile.save()
      .then((data) => {
        this.updateOne({ profile: data?._id })
          .then(() => {
            ProfileModel.updateOne(
              { _id: data?._id },
              { $set: { userId: this._id } }
            )
              .then(() => {
                next && typeof next === "function" && next();
              })
              .catch((error) => {
                console.log(error);
                next && typeof next === "function" && next();
              });
          })
          .catch((error) => {
            next && typeof next === "function" && next();
          });
      })
      .catch(() => {
        next();
      });
  } catch (error) {
    console.log(error);
    next();
  }
});

exports.UserModel = model("Users", UserSchema);

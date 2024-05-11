const { ERRORS } = require("../Constants/app.constant");
const { ImageModel } = require("../Models/image.model");
const { ProductModel } = require("../Models/product.model");
const {
  CartModel,
  WishModel,
  OrderedProduct,
} = require("../Models/cart.model");
const {
  Types: { ObjectId },
} = require("mongoose");
exports.addProduct = async function (req, res, next) {
  try {
    const { images } = req.body;
    const imgs = images.map((url) => {
      return { url };
    });
    const savedImages = await ImageModel.insertMany(imgs);
    const product = {
      ...req.body,
      images: savedImages,
      userId: req.userId,
    };
    const ProductDetails = ProductModel(product);
    const data = await ProductDetails.save();
    if (data) {
      res.status(200).send({
        data,
        message: ERRORS.PRODUCT_ADDED_SUCCESSFULLY,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_PRODUCT_ADDITION,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: ERRORS.ERROR_IN_PRODUCT_ADDITION,
      error,
    });
  }
};

exports.fetchProducts = async function (req, res, next) {
  try {
    const id = req.query["id"];
    let data = null;
    const aggs = [
      {
        $lookup: {
          foreignField: "_id",
          localField: "images",
          from: "images",
          as: "images",
        },
      },
      {
        $lookup: {
          foreignField: "_id",
          localField: "tags",
          from: "tags",
          as: "tags",
        },
      },
    ];
    if (id) {
      aggs.unshift({
        $match: { _id: new ObjectId(id) },
      });
    }
    data = await ProductModel.aggregate(aggs);

    if (data) {
      res.status(200).send({
        data: id ? (data.length > 0 ? data[0] : null) : data,
        message: ERRORS.PRODUCTS_FETCHED_SUCCESSFULLY,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_FETCHING_PRODUCTS,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: ERRORS.ERROR_IN_FETCHING_PRODUCTS,
      error,
    });
  }
};

exports.deleteProducts = async function (req, res, next) {
  try {
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

exports.addToCartOrWish = async function (req, res, next) {
  try {
    const { id, type } = req.query;
    let data = null;
    console.log(id, type);
    if (type === "cart") {
      const ProductOrdered = new OrderedProduct({
        productId: id,
        cartId: req.cartId,
      });
      const SavedOrderedProduct = await ProductOrdered.save();
      data = await CartModel.updateOne(
        { _id: req.cartId },
        { $push: { products: SavedOrderedProduct.productId } }
      );
    } else {
      data = await WishModel.updateOne(
        { _id: req.wishId },
        { $push: { products: id } }
      );
    }
    if (data) {
      res.status(201).send({
        message: ERRORS.ADDED_TO_CART_OR_WISH_LIST_SUCESSFULLY,
        data,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_ADDING_TO_CART_OR_WISHLIST,
      });
    }
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: ERRORS.ERROR_IN_ADDING_TO_CART_OR_WISHLIST,
      error,
    });
    return;
  }
};

async function userCartDetails(cartId) {
  try {
    const data = await OrderedProduct.aggregate([
      {
        $match: {
          cartId: new ObjectId(cartId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $lookup: {
          from: "images",
          localField: "productDetails.images",
          foreignField: "_id",
          as: "productDetails.images",
        },
      },
      {
        $addFields: {
          "productDetails.totalPrice": {
            $multiply: ["$productDetails.price", "$quantity"],
          },
          "productDetails.quantity": "$quantity",
          totalPrice: { $multiply: ["$productDetails.price", "$quantity"] },
        },
      },
      {
        $group: {
          _id: "$cardId",
          products: {
            $push: "$productDetails",
          },
          orderTotal: { $sum: "$totalPrice" },
        },
      },
    ]);
    return data && data?.length > 0 ? data[0] : data;
  } catch (error) {
    throw error;
  }
}

exports.fetchCartItems = async function (req, res, next) {
  try {
    const data = await userCartDetails(req.cartId);
    if (data) {
      res.status(200).send({
        message: ERRORS.CART_ITEMS_FETCHED_SUCCESSFULLY,
        data,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_FETCHING_CART_ITEMS,
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_FETCHING_CART_ITEMS,
    });
  } finally {
    return;
  }
};

exports.updateItemQuantity = async function (req, res, next) {
  try {
    const { productId, quantity } = req.body;
    console.log(productId, quantity);
    const data = await OrderedProduct.findOneAndUpdate(
      {
        cartId: req.cartId,
        productId: productId,
      },
      {
        $set: { quantity: quantity },
      }
    );
    if (data) {
      res.status(200).send({
        message: ERRORS.CART_ITEM_QUANTITY_UPDATE_SUCCESSFULLY,
        data,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_UPDATING_CART_ITEM_QUANTITY,
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_UPDATING_CART_ITEM_QUANTITY,
    });
  } finally {
    return;
  }
};

exports.removeFromCart = async function (req, res, next) {
  try {
    const productId = req.query["productId"];

    await OrderedProduct.findOneAndDelete({
      cartId: req.cartId,
      productId: productId,
    });

    const data = await CartModel.updateOne(
      { _id: req.cartId },
      { $pull: { products: productId } }
    );
    if (data) {
      res.status(200).send({
        data,
        message: ERRORS.ITEM_REMOVED_FROM_CART_SUCCESSFULLY,
      });
    }
    res.status(500).send({
      message: ERRORS.ERROR_IN_REMOVING_CART_ITEM,
    });
  } catch (error) {
    res.status(500).send({
      message: ERRORS.ERROR_IN_REMOVING_CART_ITEM,
      error,
    });
  } finally {
    return;
  }
};

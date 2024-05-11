const {
  addProduct,
  fetchProducts,
  addToCartOrWish,
  fetchCartItems,
  updateItemQuantity,
  removeFromCart,
} = require("../Controllers/product.controller");
const { verifyToken } = require("../Middlewares/veriftyToken");

module.exports = function (app) {
  app.get("/products", fetchProducts);
  app.post("/products/add", [verifyToken], addProduct);

  app.get("/cart/add", [verifyToken], addToCartOrWish);
  app.get("/cart/items", [verifyToken], fetchCartItems);
  app.post("/cart/item/quantity", [verifyToken], updateItemQuantity);
  app.get("/cart/item/delete", [verifyToken], removeFromCart);
  return app;
};

import axios from "axios";
import store, { signout, showToastMessage, AppAction } from "../Store";

class Http extends axios.Axios {
  get token() {
    if (window.localStorage) {
      return localStorage.getItem("x-access-token");
    }
  }

  constructor() {
    super({
      baseURL: "http://localhost:3001",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
      transformRequest: [...axios.defaults.transformRequest],
    });
    this.interceptors.request.use((req) => {
      req.headers.set("x-access-token", this.token);
      const state = store.getState();
      if (!state?.blogState?.loading) {
        if (req.headers.get("withLoader")) {
          store.dispatch({ type: AppAction.LOADER.SHOW });
          req.headers.delete("withLoader");
        }
      }
      return req;
    });
    this.interceptors.response.use((response) => {
      const state = store.getState();
      if (state?.blogState?.loading) {
        store.dispatch({ type: AppAction.LOADER.HIDE });
      }
      if (response.status === 401) {
        store.dispatch(signout());
      }
      const isError = [201, 200].includes(response?.status) === false;
      const message = JSON.parse(response?.data)?.message;
      store.dispatch(
        showToastMessage({
          message: message ? message : isError ? "Failed" : "Success",
          isError,
        })
      );
      return { ...JSON.parse(response.data), status: response.status };
    });
  }

  convertObjectToQueryString(params) {
    if (!params) return;
    return `?${Object.entries(params)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&")}`;
  }

  signUp(payload) {
    return this.post("/users/signUp", payload, {
      headers: { withLoader: true },
    });
  }

  signIn(payload) {
    return this.post("/users/signIn", payload, {
      headers: { withLoader: true },
    });
  }

  loadBlogs(params) {
    let url = "/blogs";
    if (params) {
      url += this.convertObjectToQueryString(params);
    }
    return this.get(url, {
      headers: { withLoader: true },
    });
  }

  verifyEmail(payload) {
    return this.get("/email/verify" + this.convertObjectToQueryString(payload));
  }

  fetchUserDetails() {
    return this.get("/users/details", {
      headers: { withLoader: true },
    });
  }

  saveBlog(payload) {
    return this.post("/blogs/save", payload, {
      headers: { withLoader: true },
    });
  }

  likeBlog(payload) {
    return this.get("/blogs/like" + this.convertObjectToQueryString(payload));
  }

  fetchBlogDetails(payload) {
    return this.get("/blogs" + this.convertObjectToQueryString(payload), {
      headers: { withLoader: true },
    });
  }

  fetchCommentDetails(payload) {
    return this.get("/comment/view" + this.convertObjectToQueryString(payload));
  }

  addComment(payload) {
    return this.post("/comment", payload);
  }

  saveTradeDetails(payload) {
    return this.post("/trades/add", payload, {
      headers: { withLoader: true },
    });
  }

  fetchTrades(payload) {
    return this.post("/trades/fetch", payload, {
      headers: { withLoader: true },
    });
  }

  uploadFile(fileData) {
    return this.post("/upload/files", fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  fetchProducts(payload) {
    if (payload) {
      return this.get(
        "/store/products" + this.convertObjectToQueryString(payload)
      );
    }
    return this.get("/store/products", {
      headers: { withLoader: true },
    });
  }

  addProduct(payload) {
    return this.post("/store/products/add", payload, {
      headers: { withLoader: true },
    });
  }

  addTags(payload) {
    return this.post("/common/tags/add", payload);
  }

  fetchTags() {
    return this.get("/common/tags/all");
  }

  removeTags(payload) {
    return this.get(
      "/common/tags/remove" + this.convertObjectToQueryString(payload)
    );
  }

  addToCartOrWish(payload) {
    return this.get(
      "/store/cart/add" + this.convertObjectToQueryString(payload),
      {
        headers: { withLoader: true },
      }
    );
  }

  fetchCartItems() {
    return this.get("/store/cart/items", {
      headers: { withLoader: true },
    });
  }

  fetchCartSummary() {
    return this.get("/store/cart/summary", {
      headers: { withLoader: true },
    });
  }

  updateItemQuantity(payload) {
    return this.post("/store/cart/item/quantity", payload);
  }

  removeFromCart(payload) {
    return this.get(
      "/store/cart/item/delete" + this.convertObjectToQueryString(payload)
    );
  }

  saveUserProfile(payload) {
    return this.post("/user/profile", payload);
  }

  saveUserAddress(payload) {
    return this.post("/user/address", payload);
  }

  fetchUserProfile() {
    return this.get("/user/profile");
  }

  deleUserAddress(payload) {
    return this.delete(
      "/user/address" + this.convertObjectToQueryString(payload)
    );
  }
}

export default new Http();

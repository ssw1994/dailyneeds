import { Action } from "../Models";
import { AppAction } from "./App.action";

const initialState = {
  products: [],
  productDetails: null,
  cartItems: [],
  cartSummary: null,
  actions: {
    products: Action.NONE,
    addToCartOrWish: Action.NONE,
    cartItems: Action.NONE,
    cartSummary: Action.NONE,
  },
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case AppAction.FETCH_PRODUCTS.LOADING: {
      return {
        ...state,
        actions: {
          ...state.actions,
          products: Action.LOADING,
        },
      };
    }
    case AppAction.FETCH_PRODUCTS.SUCCESS: {
      return {
        ...state,
        products: action?.productDetails ? [] : action.payload,
        productDetails: action.productDetails ? action.payload : null,
        actions: {
          ...state.actions,
          products: Action.SUCCESS,
        },
      };
    }
    case AppAction.FETCH_PRODUCTS.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          products: Action.FAILURE,
        },
      };
    }
    case AppAction.ADD_PRODUCT.SAVING: {
      return {
        ...state,
        actions: {
          ...state.actions,
          addProducts: Action.LOADING,
        },
      };
    }
    case AppAction.ADD_PRODUCT.SAVED: {
      return {
        ...state,
        actions: {
          ...state.actions,
          addProducts: Action.SUCCESS,
        },
      };
    }
    case AppAction.ADD_PRODUCT.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          addProducts: Action.FAILURE,
        },
      };
    }
    case AppAction.ADD_PRODUCT.RESET: {
      return {
        ...state,
        actions: {
          ...state.actions,
          addProducts: Action.NONE,
        },
      };
    }

    case AppAction.ADD_TO_CART_OR_WISH.SAVING: {
      return {
        ...state,
        actions: {
          ...state.actions,
          addToCartOrWish: Action.LOADING,
        },
      };
    }
    case AppAction.ADD_TO_CART_OR_WISH.SAVED: {
      return {
        ...state,
        actions: {
          ...state.actions,
          addToCartOrWish: Action.SUCCESS,
        },
      };
    }
    case AppAction.ADD_TO_CART_OR_WISH.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          addToCartOrWish: Action.ERROR,
        },
      };
    }
    case AppAction.CART_ITEMS.LOADING: {
      return {
        ...state,
        actions: {
          ...state.actions,
          cartItems: Action.LOADING,
        },
      };
    }
    case AppAction.CART_ITEMS.LOADED: {
      return {
        ...state,
        cartItems: action.payload,
        actions: {
          ...state.actions,
          cartItems: Action.SUCCESS,
        },
      };
    }
    case AppAction.CART_ITEMS.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          cartItems: Action.FAILURE,
        },
      };
    }

    case AppAction.CART_SUMMARY.LOADING: {
      return {
        ...state,
        actions: {
          ...state.actions,
          cartSummary: Action.LOADING,
        },
      };
    }
    case AppAction.CART_SUMMARY.LOADED: {
      return {
        ...state,
        cartSummary: action.payload,
        actions: {
          ...state.actions,
          cartSummary: Action.LOADED,
        },
      };
    }
    case AppAction.CART_SUMMARY.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          cartSummary: Action.FAILURE,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
}

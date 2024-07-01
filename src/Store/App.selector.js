import moment from "moment";
import { Action } from "../Models";
import { createSelector } from "reselect";

export const AppState = createSelector([(state) => state], (state) => state);

export const blogState = createSelector(
  [(state) => state?.blogState],
  (blogState) => blogState
);

export const tradeState = createSelector(
  [(state) => state?.tradeState],
  (tradeState) => tradeState
);

export const blogStateActions = createSelector(
  [(state) => state?.blogState?.action],
  (action) => action
);

export const tradeStateActions = createSelector(
  [(state) => state?.tradeState?.action],
  (action) => action
);

export const isLoggedIn = createSelector(blogStateActions, (state) => {
  return state.userDetails === Action.NONE
    ? null
    : state?.userDetails === Action.SUCCESS;
});

export const userDetails = createSelector(
  blogState,
  (state) => state.userDetails
);

export const isBloggedSaved = createSelector(
  blogState,
  (state) => state?.action?.create === Action.SUCCESS
);

export const blogDetails = createSelector(
  blogState,
  (state) => state?.blogDetails
);
export const blogDetailsError = createSelector(
  blogStateActions,
  (state) => state?.blogDetails === Action.ERROR
);
export const blogDetailsSuccess = createSelector(
  blogStateActions,
  (state) => state?.blogDetails === Action.SUCCESS
);

export const appLoading = createSelector(
  blogState,
  (state) => state?.loading === true
);

export const loadingBlogDetails = createSelector(
  blogStateActions,
  (actions) => actions.blogDetails === Action.LOADING
);
export const blogs = createSelector(blogState, (state) => state.blogs);

export const toastMsg = createSelector(
  blogState,
  (state) => state?.toastMessage
);

export const getCommentDetails = createSelector(
  [blogState, (state, id) => id],
  (state, id) => {
    if (state?.comments && state?.comments[id]) {
      return state.comments[id];
    }
    return [];
  }
);

export const userProfileInfo = createSelector([blogState], (state) => {
  return state?.profileInfo;
});

export const userAddressInfo = createSelector([blogState], (state) => {
  return state?.profileInfo?.address ?? [];
});

export const isAddressSavedSuccessfully = createSelector(
  [blogStateActions],
  (action) => {
    return action?.profile === Action.SUCCESS;
  }
);

export const isUserProfileSavedSuccessfully = createSelector(
  [blogStateActions],
  (action) => {
    return action?.profile === Action.SUCCESS;
  }
);

export const isCommentSavedSuccessFully = createSelector(
  [blogStateActions, (state, id) => id],
  (state, id) => {
    if (state?.comments && state?.comments[id]) {
      return state.comments[id] === Action.SUCCESS;
    }
    return false;
  }
);

export const getActiveApp = createSelector(
  blogState,
  (state) => state?.activeApp
);

export const trade = createSelector(
  [tradeState, (trades, date) => date],
  (state, date) => {
    if (state?.trades instanceof Map && date) {
      return state.trades.get(date);
    }
    return null;
  }
);

export const tradeSaved = createSelector(
  [tradeStateActions, (state, date) => date],
  (actions, date) => {
    if (date && actions?.tradeAdded[date]) {
      return actions?.tradeAdded[date] === Action.SUCCESS;
    }
    return false;
  }
);

export const tradeList = createSelector(tradeState, (state) => {
  if (state?.trades instanceof Map) {
    return Array.from(state.trades.values()).map((trade) => {
      return {
        ...trade,
        dateOfTrade: moment(trade.dateOfTrade).utc(),
      };
    });
  }
  return [];
});

export const allTags = createSelector(blogState, (state) => [
  ...state?.allTags,
]);

export const isTagSavedSuccessfully = createSelector(
  blogStateActions,
  (state) => state?.tagAddition === Action.SUCCESS
);

// export const getCommentDetails = createSelector(
//   [(blogState) => blogState.comments, (comments, id) => id],
//   (comments, id) => {
//     if (id && comments?.hasOwnProperty(id)) {
//       return comments[id];
//     }
//     return [];
//   }
// );

// Store State

export const storeState = createSelector(
  [(state) => state],
  (state) => state?.storeState
);
export const storeStateActions = createSelector(
  [(state) => state?.storeState?.actions],
  (actions) => actions
);
export const isProductSaveSuccess = createSelector(
  storeStateActions,
  (state) => state?.addProducts === Action.SUCCESS
);
export const products = createSelector(storeState, (state) => state?.products);

export const productDetails = createSelector(
  storeState,
  (state) => state?.productDetails
);

export const cartItems = createSelector(
  storeState,
  (state) => state?.cartItems
);

export const orderSummary = createSelector(cartItems, (items) => {
  return {
    products: cartItems?.products,
    orderTotal: cartItems?.orderTotal,
  };
});

export const tourState = createSelector(
  [(state) => state.tourState],
  (state) => state
);

export const tourStateActions = createSelector(
  [tourState, (state) => state.actions],
  (actions) => actions
);

export const myTours = createSelector(tourState, (state) => state?.tours);

export const viewTourDetails = createSelector(
  tourState,
  (state) => state?.viewTour
);

import { Action } from "../Models";
import { AppAction } from "./App.action";

const initialState = {
  trades: {},
  filters: null,
  actions: {
    trades: null,
    tradeAdded: Action.NONE,
  },
};

export default function TradeReducer(state = initialState, action) {
  switch (action.type) {
    case AppAction.ADD_TRADE.SAVING: {
      return {
        ...state,
        actions: {
          ...state.actions,
          tradeAdded: { [action?.payload?.dateOfTrade]: Action.LOADING },
        },
      };
    }

    case AppAction.ADD_TRADE.SAVED: {
      return {
        ...state,
        actions: {
          ...state.actions,
          tradeAdded: { [action?.payload?.dateOfTrade]: Action.SUCCESS },
        },
      };
    }

    case AppAction.ADD_TRADE.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          tradeAdded: { [action?.payload?.dateOfTrade]: Action.FAILURE },
        },
      };
    }
    case AppAction.FETCH_TRADES.LOADING: {
      return {
        ...state,
        trades: new Map(),
        actions: {
          ...state.actions,
          trades: Action.LOADING,
        },
      };
    }
    case AppAction.FETCH_TRADES.SUCCESS: {
      return {
        ...state,
        ...action.payload,
        actions: {
          ...state.actions,
          trades: Action.SUCCESS,
        },
      };
    }
    case AppAction.FETCH_TRADES.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          trades: Action.FAILURE,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
}

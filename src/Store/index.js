import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import BlogReducer from "./App.reducer";
import TradeReducer from "./Trade.reducer";
import StoreReducer from "./store.reducer";
export * from "./App.action";
export * from "./App.dispatcher";
export * from "./App.selector";
const reducers = combineReducers({
  blogState: BlogReducer,
  tradeState: TradeReducer,
  storeState: StoreReducer,
});

export default createStore(reducers, applyMiddleware(thunk));

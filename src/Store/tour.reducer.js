import { Action } from "../Models";
import { AppAction } from "./App.action";

const initialTourState = {
  tours: [],
  viewTour: null,
  actions: {
    tours: Action.NONE,
  },
};
export default function tourReducer(state = initialTourState, action) {
  switch (action.type) {
    case AppAction.FETCH_TOURS.LOADING:
      return {
        ...state,
        actions: {
          ...state.actions,
          tours: Action.LOADING,
        },
      };
    case AppAction.FETCH_TOURS.LOADED:
      return {
        ...state,
        tours: action.payload,
        actions: {
          ...state.actions,
          tours: Action.SUCCESS,
        },
      };
    case AppAction.FETCH_TOURS.FAILURE:
      return {
        ...state,
        actions: {
          ...state.actions,
          tours: Action.ERROR,
        },
      };

    case AppAction.FETCH_TOUR_DETAILS.LOADING: {
      return {
        ...state,
        actions: {
          ...state.actions,
          viewTour: Action.LOADING,
        },
      };
    }
    case AppAction.FETCH_TOUR_DETAILS.LOADED: {
      return {
        ...state,
        viewTour: action.payload,
        actions: {
          ...state.actions,
          viewTour: Action.SUCCESS,
        },
      };
    }
    case AppAction.FETCH_TOUR_DETAILS.FAILURE: {
      return {
        ...state,
        actions: {
          ...state.actions,
          viewTour: Action.ERROR,
        },
      };
    }

    default: {
      return { ...state };
    }
  }
}

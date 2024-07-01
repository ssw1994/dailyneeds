import { DayPlanModel } from "./DayPlanModel";

export const TOUR_ACTIONS = {
  ADD_PLAN: "ADD PLAN",
  SAVE_PLAN: "SAVE PLAN",
  UPDATE_PLAN: "UPDATE_PLAN",
  UPDATE_HOTEL_DETAILS: "UPDATE HOTEL DETAILS",
  UPDATE_TOUR_DETAILS: "UPDATE TOUR DETAILS",
  UPDATE_CONTACT_DETAILS: "UPDATE CONTACT DETAILS",
  DELETE_PLAN: "DELETE_PLAN",
};
export const initialState = {
  dayPlans: [new DayPlanModel()],
};
export default function TourReducer(state = initialState, action) {
  switch (action.type) {
    case TOUR_ACTIONS.ADD_PLAN: {
      return {
        ...state,
        dayPlans: [...state.dayPlans, new DayPlanModel()],
      };
    }
    case TOUR_ACTIONS.UPDATE_TOUR_DETAILS: {
      return {
        ...state,
        dayPlans: state.dayPlans.map((dayPlan) => {
          if (action?.payload?.uuid === dayPlan?.uuid) {
            return {
              ...dayPlan,
              ...action.payload.details,
            };
          }
        }),
      };
    }
    case TOUR_ACTIONS.UPDATE_HOTEL_DETAILS: {
      return {
        ...state,
        dayPlans: state.dayPlans.map((dayPlan) => {
          if (action?.payload?.uuid === dayPlan?.uuid) {
            return {
              ...dayPlan,
              hotelDetails: action?.payload?.details,
            };
          }
        }),
      };
    }
    case TOUR_ACTIONS.UPDATE_CONTACT_DETAILS: {
      return {
        ...state,
        dayPlans: state.dayPlans.map((dayPlan) => {
          if (action?.payload?.uuid === dayPlan?.uuid) {
            return {
              ...dayPlan,
              contactDetails: action?.payload?.details,
            };
          }
        }),
      };
    }
    case TOUR_ACTIONS.DELETE_PLAN: {
      return {
        ...state,
        dayPlans: state.dayPlans.filter(
          (dayPlan) => dayPlan?.uuid !== action?.payload?.uuid
        ),
      };
    }
  }
}

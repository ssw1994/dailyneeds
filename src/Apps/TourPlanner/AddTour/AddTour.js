import { useContext, useMemo, useReducer, useState } from "react";
import { FormControl } from "../../../Hooks/FormControl";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { Card, CardFooter } from "../../../Shared";
import DayPlan from "../DayPlan/DayPlan";
import { UIFormGroup, UIFormControl } from "../../../Shared/Form";
import TourReducer, { TOUR_ACTIONS, initialState } from "./TourReducer";
import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { saveUserTour } from "../../../Store";
export const TourContext = React.createContext(null);
export const TourActionContext = React.createContext(null);
export default function AddTour() {
  const [state, dispatch] = useReducer(TourReducer, initialState);

  const dispatchHttp = useDispatch();
  const fromDateShouldBeLessThantoDate = () => {
    if (!tourForm) return;
    const values = tourForm.getValue();
    if (!values.fromDate || !values.toDate) return true;
    if (
      moment(values.fromDate).isValid() &&
      moment(values.toDate).isValid &&
      moment(values.fromDate).isSameOrBefore(moment(values.toDate))
    ) {
      return true;
    }
    return false;
  };
  const [tourForm, updateTourForm] = useFormGroup(
    new FormGroup(
      {
        name: new FormControl("name", "", true),
        fromDate: new FormControl("fromDate", "", true),
        toDate: new FormControl("toDate", "", true),
      },
      [fromDateShouldBeLessThantoDate]
    )
  );

  const addDayPlan = () => {
    dispatch({ type: TOUR_ACTIONS.ADD_PLAN });
  };

  const getCtrl = (ctrl) => {
    return tourForm.getCtrl(ctrl) ?? null;
  };

  const removePlan = (uuid) => {
    dispatch({ type: TOUR_ACTIONS.DELETE_PLAN, payload: { uuid } });
  };

  const saveTour = () => {
    console.log(tourForm.getValue(), state.dayPlans);
    const payload = {
      ...tourForm.getValue(),
      dayPlans: state.dayPlans.map((plan) => {
        delete plan.uuid;
        return plan;
      }),
    };
    dispatchHttp(saveUserTour(payload));
  };

  return (
    <TourContext.Provider value={state}>
      <TourActionContext.Provider value={dispatch}>
        <div className="add-tour">
          <Card>
            <UIFormGroup>
              <UIFormControl control={getCtrl("name")}>
                <input
                  value={getCtrl("name")?.value}
                  onChange={(e) => updateTourForm("name", e.target.value)}
                />
              </UIFormControl>

              <UIFormControl control={getCtrl("fromDate")}>
                <input
                  type="date"
                  value={getCtrl("fromDate")?.value}
                  onChange={(e) => updateTourForm("fromDate", e.target.value)}
                />
              </UIFormControl>

              <UIFormControl control={getCtrl("toDate")}>
                <input
                  type="date"
                  value={getCtrl("toDate")?.value}
                  onChange={(e) => updateTourForm("toDate", e.target.value)}
                />
              </UIFormControl>
            </UIFormGroup>

            <div className="flex-row-left-items plans">
              {state.dayPlans.map((dayPlan, index) => {
                return (
                  <div className="plan" key={dayPlan.uuid}>
                    <button
                      className="delete-plan"
                      onClick={() => removePlan(dayPlan.uuid)}
                    >
                      <i className="fa fa-close"></i>
                    </button>
                    <DayPlan {...dayPlan} />
                  </div>
                );
              })}
            </div>
            <CardFooter>
              {!fromDateShouldBeLessThantoDate() && (
                <p className="error" style={{ textAlign: "center" }}>
                  from date should be less than to date
                </p>
              )}
              <div className="actions" style={{ width: "100%" }}>
                <button disabled={!tourForm.valid} onClick={saveTour}>
                  Save
                </button>
                <button onClick={() => addDayPlan()}>
                  Add {state.dayPlans.length > 0 && "More"} Plan
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </TourActionContext.Provider>
    </TourContext.Provider>
  );
}

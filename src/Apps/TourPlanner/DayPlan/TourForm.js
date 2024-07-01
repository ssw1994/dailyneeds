import { FormControl } from "../../../Hooks/FormControl";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import { Card, CardFooter } from "../../../Shared";
import Tab from "../../../Shared/Tabs/Tab";
import moment from "moment";
import { useContext, useEffect } from "react";
import { TourActionContext } from "../AddTour/AddTour";
import { TOUR_ACTIONS } from "../AddTour/TourReducer";
import { FormArray } from "../../../Hooks/FormArray";

export const TourForm = ({ nextTab, uuid }) => {
  const dispatch = useContext(TourActionContext);
  const fromDateShouldBeLessThantoDate = () => {
    if (!dayForm) return;
    const values = dayForm.getValue();
    if (
      moment(values.fromDate).isValid() &&
      moment(values.toDate).isValid &&
      moment(values.fromDate).isSameOrBefore(moment(values.toDate))
    ) {
      return true;
    }
    return false;
  };

  const [dayForm, updateDayForm] = useFormGroup(
    new FormGroup(
      {
        destination: new FormControl("destination", "", true),
        fromDate: new FormControl("fromDate", "", true),
        toDate: new FormControl("toDate", "", true),
        location: new FormControl("location", {
          latitude: null,
          longitude: null,
        }),
        dayPlans: new FormArray([]),
      },
      [fromDateShouldBeLessThantoDate]
    )
  );

  useEffect(() => {
    dispatch({
      type: TOUR_ACTIONS.UPDATE_TOUR_DETAILS,
      payload: { details: dayForm.getValue(), uuid },
    });
  }, [dayForm]);

  const proceedToNextTab = () => {
    if (nextTab && typeof nextTab === "function") {
      nextTab();
    }
  };

  const getCtrl = (ctrl) => {
    return dayForm.getCtrl(ctrl) ?? null;
  };

  return (
    <Card>
      <UIFormGroup>
        <UIFormControl control={getCtrl("destination")}>
          <input
            value={getCtrl("destination")?.value}
            onChange={(e) => updateDayForm("destination", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("fromDate")}>
          <input
            type="date"
            value={getCtrl("fromDate")?.value}
            onChange={(e) => updateDayForm("fromDate", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("toDate")}>
          <input
            type="date"
            value={getCtrl("toDate")?.value}
            onChange={(e) => updateDayForm("toDate", e.target.value)}
          />
        </UIFormControl>
      </UIFormGroup>
      <CardFooter>
        <div className="actions">
          <button disabled={!dayForm.valid} onClick={proceedToNextTab}>
            Proceed
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Tab(TourForm);

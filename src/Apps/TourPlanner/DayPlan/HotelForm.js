import { FormControl } from "../../../Hooks/FormControl";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import { Card, CardFooter } from "../../../Shared";
import Tab from "../../../Shared/Tabs/Tab";
import { useContext, useEffect } from "react";
import { TourActionContext } from "../AddTour/AddTour";
import { TOUR_ACTIONS } from "../AddTour/TourReducer";

export const HotelForm = ({ nextTab, uuid }) => {
  const dispatch = useContext(TourActionContext);
  const [hotelForm, updateHotelForm] = useFormGroup(
    new FormGroup({
      name: new FormControl("name", "", true),
      address: new FormControl("address", "", true),
      location: new FormControl("location", {
        latitude: null,
        longitude: null,
      }),
      number: new FormControl("number", "", true),
      email: new FormControl("email", ""),
    })
  );

  const getCtrl = (ctrl) => {
    return hotelForm.getCtrl(ctrl) ?? null;
  };

  useEffect(() => {
    dispatch({
      type: TOUR_ACTIONS.UPDATE_HOTEL_DETAILS,
      payload: { details: hotelForm.getValue(), uuid },
    });
  }, [hotelForm]);

  const proceedToNextTab = () => {
    if (nextTab && typeof nextTab === "function") {
      nextTab();
    }
  };

  return (
    <Card>
      <UIFormGroup>
        <UIFormControl control={getCtrl("name")}>
          <input
            value={getCtrl("name")?.value}
            onChange={(e) => updateHotelForm("name", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("number")}>
          <input
            value={getCtrl("number")?.value}
            onChange={(e) => updateHotelForm("number", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("email")}>
          <input
            value={getCtrl("email")?.value}
            onChange={(e) => updateHotelForm("email", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("address")}>
          <input
            value={getCtrl("address")?.value}
            onChange={(e) => updateHotelForm("address", e.target.value)}
          />
        </UIFormControl>
      </UIFormGroup>
      <CardFooter>
        <div className="actions">
          <button disabled={!hotelForm.valid} onClick={proceedToNextTab}>
            Proceed
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Tab(HotelForm);

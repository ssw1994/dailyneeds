import { FormControl } from "../../../Hooks/FormControl";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import { Card, CardFooter } from "../../../Shared";
import Tab from "../../../Shared/Tabs/Tab";
import { useContext, useEffect } from "react";
import { TourActionContext } from "../AddTour/AddTour";
import { TOUR_ACTIONS } from "../AddTour/TourReducer";
export const ContractPersonForm = ({ nextTab, uuid }) => {
  const dispatch = useContext(TourActionContext);
  const [contactPersonForm, updateContactPersonForm] = useFormGroup(
    new FormGroup({
      name: new FormControl("name", "", true),
      mobile: new FormControl("mobile", "", true),
      email: new FormControl("email", ""),
      address: new FormControl("address", ""),
    })
  );

  const getCtrl = (ctrl) => {
    return contactPersonForm.getCtrl(ctrl) ?? null;
  };

  useEffect(() => {
    dispatch({
      type: TOUR_ACTIONS.UPDATE_CONTACT_DETAILS,
      payload: { details: contactPersonForm.getValue(), uuid },
    });
  }, [contactPersonForm]);

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
            onChange={(e) => updateContactPersonForm("name", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("mobile")}>
          <input
            value={getCtrl("mobile")?.value}
            onChange={(e) => updateContactPersonForm("mobile", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("email")}>
          <input
            value={getCtrl("email")?.value}
            onChange={(e) => updateContactPersonForm("email", e.target.value)}
          />
        </UIFormControl>

        <UIFormControl control={getCtrl("address")}>
          <input
            value={getCtrl("address")?.value}
            onChange={(e) => updateContactPersonForm("address", e.target.value)}
          />
        </UIFormControl>
      </UIFormGroup>
      <CardFooter>
        <div className="actions">
          <button button={!contactPersonForm.valid} onClick={proceedToNextTab}>
            Proceed
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Tab(ContractPersonForm);

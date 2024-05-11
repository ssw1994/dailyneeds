import React, { useEffect, useState } from "react";
import Card from "../../../Shared/Card/Card";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { FormControl } from "../../../Hooks/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { MODE } from "../../../Models";
import {
  isUserProfileSavedSuccessfully,
  saveUserProfile,
  userProfileInfo,
} from "../../../Store";
import { getViewTemplate } from "./Profile";
export const BasicInfo = () => {
  const dispatch = useDispatch();
  const isProfileSaved = useSelector(isUserProfileSavedSuccessfully);
  const [mode, updateMode] = useState(MODE.VIEW);
  const profileInfo = useSelector(userProfileInfo);
  const [profileForm, updateProfileForm, reset, patchValue] = useFormGroup(
    new FormGroup({
      firstName: new FormControl("firstName", "", true),
      lastName: new FormControl("lastName", "", true),
      mobile: new FormControl("mobile", "", true),
      email: new FormControl("email", "", true),
    })
  );

  useEffect(() => {
    if (isProfileSaved) {
      toggleMode();
    }
  }, [isProfileSaved]);

  useEffect(() => {
    if (profileInfo) {
      patchValue(profileInfo);
    }
  }, [profileInfo]);

  const toggleMode = () => {
    updateMode(mode === MODE.VIEW ? MODE.EDIT : MODE.VIEW);
  };

  const updateForm = (e, ctrl) => {
    updateProfileForm(ctrl, e?.target?.value);
  };

  const getCtrl = (name) => {
    return profileForm?.getCtrl(name) ?? null;
  };

  const saveProfile = () => {
    const payload = profileForm.getValue();
    dispatch(saveUserProfile(payload));
  };

  if (mode === MODE.VIEW) {
    const values = profileForm.getValue();
    return (
      <Card style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={toggleMode}>
          <i className="fa-solid fa-pencil"></i>
        </button>
        <Card style={{ width: "50%" }}>{getViewTemplate(values)}</Card>
      </Card>
    );
  }

  return (
    <Card>
      <UIFormGroup>
        <div className="flex-row-left-items">
          <UIFormControl control={getCtrl("firstName")}>
            <input
              value={getCtrl("firstName")?.value}
              onChange={(e) => updateForm(e, "firstName")}
            />
          </UIFormControl>
          <UIFormControl control={getCtrl("lastName")}>
            <input
              value={getCtrl("lastName")?.value}
              onChange={(e) => updateForm(e, "lastName")}
            />
          </UIFormControl>
        </div>
        <div className="flex-row-left-items">
          <UIFormControl control={getCtrl("mobile")}>
            <input
              value={getCtrl("mobile")?.value}
              onChange={(e) => updateForm(e, "mobile")}
            />
          </UIFormControl>
          <UIFormControl control={getCtrl("email")}>
            <input
              value={getCtrl("email")?.value}
              onChange={(e) => updateForm(e, "email")}
            />
          </UIFormControl>
        </div>
        <div className="flex-row-center-items">
          <button onClick={toggleMode}>Cancel</button>
          <button onClick={saveProfile}>Save</button>
        </div>
      </UIFormGroup>
    </Card>
  );
};

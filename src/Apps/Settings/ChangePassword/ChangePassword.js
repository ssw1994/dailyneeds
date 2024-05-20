import React, { useEffect, useState } from "react";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { FormControl } from "../../../Hooks/FormControl";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import Card from "../../../Shared/Card/Card";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../Store";
export default function ChangePassword() {
  const dispatch = useDispatch();
  const [changeForm, updateForm] = useFormGroup(
    new FormGroup(
      {
        oldPassword: new FormControl("oldPassword", "", true),
        newPassword: new FormControl("newPassword", "", true),
        confirmPassword: new FormControl("confirmPassword", "", true),
      },
      [confirmPassword]
    )
  );

  const [isPasswordMisMatch, updateConfirmPasswordMatch] = useState(false);

  useEffect(() => {
    updateConfirmPasswordMatch(!confirmPassword());
  }, [changeForm]);

  function confirmPassword() {
    if (!changeForm) return;
    const password = changeForm?.getCtrl("newPassword");
    const repassword = changeForm?.getCtrl("confirmPassword");
    if (password.value && repassword.value) {
      return password.value === repassword.value;
    }
    return true;
  }

  const getCtrl = (ctrl) => {
    return changeForm.getCtrl(ctrl);
  };

  const updateChangeForm = (e, ctrl) => {
    updateForm(ctrl, e?.target?.value);
  };

  const cancel = () => {};

  const save = () => {
    const values = changeForm.getValue();
    const payload = {
      oldPassword: values?.oldPassword ?? null,
      newPassword: values?.newPassword ?? null,
    };
    dispatch(changePassword(payload));
  };

  const [password, updateShowHidePassword] = useState({
    oldPassword: "password",
    newPassword: "password",
  });

  const togglePassword = (passwordType) => {
    updateShowHidePassword((pre) => {
      return {
        ...pre,
        [passwordType]: pre[passwordType] === "password" ? "text" : "password",
      };
    });
  };

  const showPasswordTemplate = (passwordType) => (
    <i
      className="fa-solid fa-eye"
      onClick={() => togglePassword(passwordType)}
    ></i>
  );
  const hidePassowrdTemplate = (passwordType) => (
    <i
      class="fa-solid fa-eye-slash"
      onClick={() => togglePassword(passwordType)}
    ></i>
  );

  const getPasswordIconTemplate = (passwordType) => {
    return password[passwordType] === "password"
      ? showPasswordTemplate(passwordType)
      : hidePassowrdTemplate(passwordType);
  };

  return (
    <Card style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "50%" }} className="change-password">
        <UIFormGroup>
          <div>
            <UIFormControl control={getCtrl("oldPassword")}>
              <input
                value={getCtrl("oldPassword")?.value}
                onChange={(e) => updateChangeForm(e, "oldPassword")}
                type={password.oldPassword}
              ></input>
              {getPasswordIconTemplate("oldPassword")}
            </UIFormControl>
          </div>
          <div>
            <UIFormControl control={getCtrl("newPassword")}>
              <input
                value={getCtrl("newPassword")?.value}
                onChange={(e) => updateChangeForm(e, "newPassword")}
                type={password.newPassword}
              ></input>
              {getPasswordIconTemplate("newPassword")}
            </UIFormControl>
          </div>
          <div>
            <UIFormControl control={getCtrl("confirmPassword")}>
              <input
                value={getCtrl("confirmPassword")?.value}
                onChange={(e) => updateChangeForm(e, "confirmPassword")}
              ></input>
              {isPasswordMisMatch && <p className="error">Password mismatch</p>}
            </UIFormControl>
          </div>
          <div className="flex-row-center-items">
            <button onClick={cancel}>Cancel</button>
            <button onClick={save} disabled={!changeForm.valid}>
              Save
            </button>
          </div>
        </UIFormGroup>
      </div>
    </Card>
  );
}

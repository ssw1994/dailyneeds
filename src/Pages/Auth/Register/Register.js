import React, { useEffect, useState } from "react";
import { FormControl } from "../../../Hooks/FormControl";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import Card from "../../../Shared/Card/Card";
import http from "../../../Services/index";
import { useDispatch } from "react-redux";
import { Register as register } from "../../../Store";
export default function Register({ fun }) {
  const dispatch = useDispatch();
  const [registerForm, updateForm] = useFormGroup(
    new FormGroup(
      {
        username: new FormControl(
          "username",
          "",
          true,
          "^[a-zA-Z0-9_@.]*$",
          3,
          25
        ),
        password: new FormControl(
          "password",
          "",
          true,
          "^[a-zA-Z0-9_]*",
          8,
          16
        ),
        repassword: new FormControl("repassword", "", true, null, null, null),
      },
      [confirmPassword, confirmUsernamePasswordShouldNotBeSame]
    )
  );

  const [isPasswordMisMatch, updateConfirmPassword] = useState(false);
  const [isPassword, setPassword] = useState(true);
  useEffect(() => {
    updateConfirmPassword(!confirmPassword());
  }, [registerForm]);

  function confirmPassword() {
    if (!registerForm) return;
    const password = registerForm?.getCtrl("password");
    const repassword = registerForm?.getCtrl("repassword");
    if (password.value && repassword.value) {
      return password.value === repassword.value;
    }
    return true;
  }

  function confirmUsernamePasswordShouldNotBeSame() {
    if (!registerForm) return;
    const password = registerForm?.getCtrl("password");
    const username = registerForm?.getCtrl("username");
    return password.value !== username.value;
  }

  const updateFormFun = function (e, control) {
    updateForm(control, e?.target?.value);
  };

  const getValue = (control) => {
    return registerForm?.getCtrl(control) ?? "";
  };

  const signUp = () => {
    const payload = registerForm.getValue();
    if (payload?.repassword) delete payload?.repassword;
    dispatch(register(payload));
  };

  const togglePassword = () => {
    setPassword(!isPassword);
  };

  const showPasswordTemplate = (
    <i className="fa-solid fa-eye" onClick={() => togglePassword()}></i>
  );
  const hidePassowrdTemplate = (
    <i class="fa-solid fa-eye-slash" onClick={() => togglePassword()}></i>
  );

  return (
    <div className="h-100 w-100 flex-row-center-items register">
      <Card style={{ width: "300px", height: "max-content" }}>
        <UIFormGroup control={registerForm}>
          <UIFormControl control={registerForm?.getCtrl("username")}>
            <input
              value={getValue("username").value}
              onChange={(e) => updateFormFun(e, "username")}
            />
          </UIFormControl>
          <div>
            <UIFormControl control={registerForm?.getCtrl("password")}>
              <input
                value={getValue("password").value}
                type={isPassword ? "password" : "text"}
                onChange={(e) => updateFormFun(e, "password")}
              />
              {isPassword ? showPasswordTemplate : hidePassowrdTemplate}
            </UIFormControl>
          </div>
          <div>
            <UIFormControl control={registerForm?.getCtrl("repassword")}>
              <input
                value={getValue("repassword").value}
                onChange={(e) => updateFormFun(e, "repassword")}
              />
              {isPasswordMisMatch && <p className="error">Password mismatch</p>}
            </UIFormControl>
          </div>
          <div className="flex-row-center-items">
            <button disabled={!registerForm.valid} onClick={signUp}>
              Register
            </button>
          </div>
        </UIFormGroup>

        <div className="flex-row-center-items">
          <button onClick={fun}>Login Here</button>
        </div>
      </Card>
    </div>
  );
}

import React, { useEffect } from "react";
import { FormControl } from "../../../Hooks/FormControl";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import Card from "../../../Shared/Card/Card";
import { useDispatch } from "react-redux";
import { Login as signInDispatch } from "../../../Store";
export default function Login({ fun }) {
  const dispatch = useDispatch();
  const [loginForm, updateForm] = useFormGroup(
    new FormGroup({
      username: new FormControl("username", "", true, "^[a-zA-Z0-9_]*$", 3, 15),
      password: new FormControl("password", "", true, "^[a-zA-Z0-9_]*", 8, 16),
    })
  );

  const updateFormFun = function (e, control) {
    updateForm(control, e?.target?.value);
  };

  const getValue = (control) => {
    return loginForm?.getCtrl(control) ?? "";
  };

  const signIn = () => {
    const payload = loginForm.getValue();
    dispatch(signInDispatch(payload));
  };

  return (
    <div className="h-100 w-100 flex-row-center-items login">
      <Card style={{ width: "300px", height: "max-content" }}>
        <div className="flex-row-center-items">
          {/* <h1>Blogger App</h1> */}
        </div>
        <UIFormGroup>
          <UIFormControl control={loginForm?.getCtrl("username")}>
            <input
              value={getValue("username").value}
              onChange={(e) => updateFormFun(e, "username")}
            />
          </UIFormControl>
          <div>
            <UIFormControl control={loginForm?.getCtrl("password")}>
              <input
                value={getValue("password").value}
                onChange={(e) => updateFormFun(e, "password")}
              />
            </UIFormControl>
          </div>
          <div className="flex-row-center-items">
            <button onClick={signIn} disabled={!loginForm.valid}>
              Login
            </button>
          </div>
        </UIFormGroup>

        <div className="flex-row-center-items">
          <button onClick={fun}>Create Account</button>
        </div>
      </Card>
    </div>
  );
}

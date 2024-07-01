import { useState } from "react";
import { FormControl } from "./FormControl";

export class FormGroup {
  _controls;
  validators = [];
  subscribers = [];
  formValid = true;
  constructor(value, validatators = []) {
    this.controls = value;
    this.validators = validatators;
  }

  get controls() {
    return this._controls;
  }

  set controls(v) {
    this._controls = v;
  }

  reset() {
    const controls = Object.values(this.controls);
    controls.forEach((control) => {
      if (control && control instanceof FormControl) {
        control?.reset();
      }
    });
  }

  subscribe(cb) {
    if (cb && typeof cb === "function") {
      this.subscribers.push(cb);
    }
  }

  getCtrl(control) {
    return this.controls[control];
  }

  get valid() {
    for (let control of Object.values(this.controls)) {
      if (control instanceof FormControl) {
        if (!control.valid) {
          return false;
        }
      }
    }
    if (!this.validators || this.validators?.length <= 0) return true;
    return this.updateFormValidity();
  }

  getValue() {
    let value = null;
    try {
      value = Object.entries(this.controls).reduce((acc, [key, ctrl]) => {
        return { ...acc, [key]: ctrl.value };
      }, {});
    } catch (error) {
      console.error(error);
    } finally {
      return value;
    }
  }

  updateFormValidity() {
    if (this.validators && this.validators instanceof Array) {
      for (let validator of this.validators) {
        if (typeof validator === "function") {
          if (!validator()) {
            return false;
          }
        }
      }
    }
    return true;
  }
  updateControl(key, value) {
    try {
      const formControl = this.controls[key];
      //this.controls[key] = value;
      if (formControl && formControl instanceof FormControl) {
        formControl.setValue(value);
        this.subscribers?.forEach((subscribe) => {
          if (subscribe && typeof subscribe === "function") {
            subscribe(this.getValue());
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  hasControl(key) {
    return this.controls && !!this.controls[key];
  }

  patchValue(values) {
    if (values && typeof values === "object") {
      Object.keys(values).forEach((key) => {
        if (this.hasControl(key)) {
          this.updateControl(key, values[key]);
        }
      });
    }
  }
}

export default function useFormGroup(initialValue) {
  const [form, updateForm] = useState(initialValue);

  const updateFormGroup = (key, value) => {
    if (!key && !value) {
      updateForm(new FormGroup(form.controls, form.validatators));
    } else {
      form.updateControl(key, value);
      updateForm(new FormGroup(form.controls, form.validators));
    }
  };

  const reset = () => {
    form.controls.forEach((control) => {
      control.reset();
    });
    updateFormGroup();
  };

  const patchValue = (value) => {
    form.patchValue(value);
    updateFormGroup();
  };
  return [form, updateFormGroup, reset, patchValue];
}

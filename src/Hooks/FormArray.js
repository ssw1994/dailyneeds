import FormControl from "../Shared/Form/FormControl";
import { FormGroup } from "./FormGroup";

export class FormArray {
  _controls = [];
  _validator = [];

  get controls() {
    return this._controls;
  }

  set controls(value) {
    this._controls = value;
  }

  get validator() {
    return this._validator;
  }

  set validator(value) {
    this._validator = value;
  }

  get valid() {
    return this.combinedValidity && this.controlsValidity;
  }

  get combinedValidity() {
    if (this.validator && this.validator instanceof Array) {
      return this.validator.every((validator) => validator(this.controls));
    }
    return true;
  }

  get controlsValidity() {
    this._controls.forEach((control) => {
      if (
        control &&
        (control instanceof FormGroup || control instanceof FormControl)
      ) {
        if (!control.valid) return false;
      }
    });
    return true;
  }

  constructor(controls, validator = null) {
    this.controls = controls;
    this.validator = validator;
  }
}

export class FormControl {
  _value;
  required;
  pattern;
  minLength;
  maxLength;
  control;

  pristine;
  touched;
  dirty;
  valid = true;
  parent = null;
  _isInitialLoad = true;
  erros = {
    required: false,
    pattern: false,
    minLength: false,
    maxLength: false,
  };

  errorsMessages = {
    required: "control is required",
    pattern: "pattern error in control",
    minLength: "control should be greater than minLength",
    maxLength: "control length should be less than maxLength",
  };

  set value(v) {
    this._value = v;
    if (!this._isInitialLoad) {
      this.dirty = true;
      this.pristine = false;
      this.touched = true;
    }
    this._isInitialLoad = false;
    this.checkValidity();
  }

  get value() {
    return this._value;
  }

  hasError(errorName) {
    if (!this.touched) return false;
    return this.erros[errorName];
  }

  constructor(
    control,
    value,
    required = false,
    pattern = null,
    minLength = null,
    maxLength = null,
    validators = []
  ) {
    this.control = control;
    this.value = value;
    this.required = required;
    this.pattern = pattern;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.validators = validators;
    this.checkValidity();
  }

  checkRequiredValidity() {
    return (
      this.value === null ||
      this.value === undefined ||
      this.value === "" ||
      (this.value instanceof Array && this.value.length <= 0)
    );
  }

  checkPatternValidity() {
    const regex = new RegExp(this.pattern);
    if (typeof this.value === "string") {
      return regex.test(this.value) === false;
    }
    return false;
  }
  checkMinLengthValidity() {
    if (typeof this.value === "string") {
      return this.value?.length < this.minLength;
    }
    return this.value?.toString()?.length < this.minLength;
  }

  checkMaxLengthValidity() {
    if (typeof this.value === "string") {
      return this.value?.length > this.maxLength;
    }
    return this.value?.toString()?.length > this.maxLength;
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

  checkValidity() {
    if (this.required) {
      this.erros.required = this.checkRequiredValidity();
      if (this.hasError("required")) return;
    }
    if (this.pattern) {
      this.erros.pattern = this.checkPatternValidity();
      if (this.hasError("required")) return;
    }
    if (this.minLength) {
      this.erros.minLength = this.checkMinLengthValidity();
      if (this.hasError("required")) return;
    }
    if (this.maxLength) {
      this.erros.maxLength = this.checkMaxLengthValidity();
      if (this.hasError("maxlength")) return;
    }
    this.valid = Object.values(this.erros).every((v) => v === false);
  }
  markAsDirty() {
    this.dirty = true;
    this.pristine = false;
  }
  markAsTouched() {
    this.touched = true;
  }
  reset() {
    this.value = null;
    this.dirty = false;
    this.pristine = true;
    this.touched = false;

    this.erros = {
      required: false,
      pattern: false,
      minLength: false,
      maxLength: false,
    };
  }

  setValue(v) {
    this.value = v;
  }
}

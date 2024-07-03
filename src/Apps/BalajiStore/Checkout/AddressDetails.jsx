import React, { forwardRef, useImperativeHandle } from "react";
import { HStep } from "../../../Shared/Stepper/Step";

const AddressDetails = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return { onNextStep, onBackStep };
  });
  const onNextStep = () => {
    console.log("AddressDetails Next Step");
  };
  const onBackStep = () => {
    console.log("AddressDetails Back Step");
  };
  return <div>AddressDetails</div>;
});

export default HStep(AddressDetails, "Address Details");

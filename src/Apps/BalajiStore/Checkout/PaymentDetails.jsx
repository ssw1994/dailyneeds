import React, { forwardRef, useImperativeHandle } from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";

export const PaymentDetails = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return { onNextStep, onBackStep };
  });
  const onNextStep = () => {
    console.log("PaymentDetails Next Step");
  };
  const onBackStep = () => {
    console.log("PaymentDetails Back Step");
  };
  return <div>PaymentDetails</div>;
});

export default HStep(PaymentDetails, "Payment Details");

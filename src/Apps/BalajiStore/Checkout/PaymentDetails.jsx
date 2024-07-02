import React from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";

export function PaymentDetails() {
  const { prevStep, nextStep } = useStep();
  return (
    <div>
      PaymentDetails
      <button onClick={prevStep}> Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default HStep(PaymentDetails, "Payment Details");

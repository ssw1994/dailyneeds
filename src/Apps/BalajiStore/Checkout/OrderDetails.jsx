import React from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";

export function OrderDetails() {
  const { nextStep, prevStep } = useStep();
  return (
    <div>
      OrderDetails
      <button onClick={prevStep}> Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default HStep(OrderDetails, "Order Details");

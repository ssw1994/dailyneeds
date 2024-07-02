import React from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";

export function AddressDetails() {
  const { prevStep, nextStep } = useStep();
  return (
    <div>
      AddressDetails
      <button onClick={prevStep}> Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default HStep(AddressDetails, "Address Details");

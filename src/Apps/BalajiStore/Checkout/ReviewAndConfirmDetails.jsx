import React from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";

export function ReviewAndConfirmDetails() {
  const { prevStep, nextStep } = useStep();
  return (
    <div>
      ReviewAndConfirmDetails
      <button onClick={prevStep}> Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

export default HStep(ReviewAndConfirmDetails, "Review");

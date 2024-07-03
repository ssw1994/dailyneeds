import React, { forwardRef, useImperativeHandle } from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";

export const ReviewAndConfirmDetails = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return { onNextStep, onBackStep };
  });
  const onNextStep = () => {
    console.log("ReviewAndConfirmDetails Next Step");
  };
  const onBackStep = () => {
    console.log("ReviewAndConfirmDetails Back Step");
  };

  return <div>ReviewAndConfirmDetails</div>;
});

export default HStep(ReviewAndConfirmDetails, "Review");

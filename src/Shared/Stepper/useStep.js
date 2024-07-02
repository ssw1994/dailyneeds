import React from "react";
import { StepperContext } from "./Stepper";

export default function useStep() {
  const { steps, updateSteps } = React.useContext(StepperContext);

  const gotoStep = (index) => {
    if (steps && steps instanceof Map) {
      const map = new Map();
      for (let [key, step] of steps) {
        map.set(key, {
          ...step,
          active: step.index === index,
        });
      }
      updateSteps(map);
    }
  };
  const nextStep = () => {
    if (steps && steps instanceof Map) {
      for (let [key, step] of steps) {
        if (step.active && step.index < steps.size) {
          steps.set(key, {
            ...step,
            active: false,
            completed: true,
          });
          gotoStep(step.index + 1);
          break;
        }
      }
    }
  };

  const prevStep = () => {
    if (steps && steps instanceof Map) {
      for (let [key, step] of steps) {
        if (step.active && step.index > 1) {
          steps.set(key, {
            ...step,
            active: false,
            completed: false,
          });
          gotoStep(step.index - 1);
          break;
        }
      }
    }
  };

  return { prevStep, nextStep };
}

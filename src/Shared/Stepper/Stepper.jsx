import React, { useCallback, useEffect, useState } from "react";
import Steps from "./Steps";
import Card from "../Card/Card";

export const StepperContext = React.createContext(null);
export class IStep {
  active = false;
  completed = false;
  stepElement = null;
  index = null;
  header = null;

  constructor(
    ele,
    header = null,
    index = null,
    active = false,
    completed = false
  ) {
    this.stepElement = ele;
    this.active = active;
    this.completed = completed;
    this.index = index;
    this.header = header;
  }
}

export default function Stepper({ children, skipSteps, defaultSteps }) {
  const [steps, updateSteps] = useState(null);

  if (typeof defaultSteps === undefined) defaultSteps = true;

  useEffect(() => {
    const map = new Map();
    React.Children.map(children, (child, index) => {
      map.set(
        index + 1,
        new IStep(child, child?.props?.header, index + 1, index === 0)
      );
    });
    updateSteps(map);
    return () => {
      updateSteps(null);
    };
  }, [children]);

  const updateStepsCallback = useCallback(
    (map) => {
      updateSteps(map);
    },
    [children]
  );

  return (
    <StepperContext.Provider value={{ steps, updateSteps }}>
      <div className="stepper">
        <Steps
          steps={steps}
          updateSteps={updateStepsCallback}
          skipSteps={skipSteps}
        />
      </div>
    </StepperContext.Provider>
  );
}

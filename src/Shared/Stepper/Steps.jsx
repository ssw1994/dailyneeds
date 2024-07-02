import { act, useEffect, useState } from "react";
import { memo } from "react";

const Steps = ({ steps, updateSteps, skipSteps }) => {
  const statusBar = [];
  const elements = [];
  if (steps && steps instanceof Map) {
    const updateActiveStep = (index) => {
      if (!skipSteps) return;
      const map = new Map();
      for (let [key, step] of steps) {
        if (step.completed && step.index > index) {
          step.completed = false;
        }
        if (step.index === index) {
          step.active = true;
        } else {
          step.active = false;
        }
        if (step.index < index) {
          step.completed = true;
        }
        map.set(key, step);
      }

      updateSteps(map);
    };
    steps.forEach((step) => {
      const { index, header, active, completed, stepElement } = step;
      const cssClass =
        "step " + (active ? "active" : completed ? "complete" : "pending");
      const stepStatus = (
        <>
          <div className={cssClass}>
            <button
              className={"step-number-" + index}
              onClick={() => updateActiveStep(index)}
            >
              {index}
            </button>
            <div className="step-header">{header}</div>
          </div>
          {index <= Array.from(steps)?.length ? <hr /> : null}
        </>
      );

      elements.push(
        <div className="step-contents" hidden={!active}>
          {stepElement}
        </div>
      );
      statusBar.push(stepStatus);
    });
  }

  return (
    <div style={{ width: "85%" }}>
      <div className="steps">{statusBar}</div>
      {elements}
    </div>
  );
};
export default memo(Steps);

import { act, useState } from "react";
import { memo } from "react";

const Steps = ({ steps, updateSteps }) => {
  const statusBar = [];
  const elements = [];
  if (steps && steps instanceof Map) {
    const updateActiveStep = (index) => {
      steps.forEach((_, step) => {});
    };
    steps.forEach((step) => {
      const { index, header, active, completed, stepElement } = step;
      const cssClass =
        "step " + (active ? "active" : completed ? "complete" : "pending");
      const stepStatus = (
        <>
          <div className={cssClass}>
            <button
              className="step-number"
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

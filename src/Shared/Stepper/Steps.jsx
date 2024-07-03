import { act, useEffect, useState } from "react";
import { memo } from "react";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";

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
          <div className={cssClass} key={"header-" + header}>
            <button
              className={"step-number-" + index}
              onClick={() => updateActiveStep(index)}
            >
              {index}
            </button>
            <div className="step-header">{header}</div>
          </div>
          {index <= Array.from(steps)?.length ? <hr key={header} /> : null}
        </>
      );

      elements.push(
        <div
          className="step-contents"
          key={"contents-" + header}
          hidden={!active}
        >
          {stepElement}
        </div>
      );
      statusBar.push(stepStatus);
    });
  }

  return (
    <Card style={{ width: "85%" }}>
      <CardHeader>
        <div className="steps">{statusBar}</div>
      </CardHeader>
      <CardBody>{elements}</CardBody>
    </Card>
  );
};
export default memo(Steps);

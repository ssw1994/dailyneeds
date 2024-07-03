import React, { createRef, memo, useEffect } from "react";
import useStep from "./useStep";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import Card from "../Card/Card";
function Step({ children }) {
  return <div className="step">{children}</div>;
}

export function HStep(WrappedComponent) {
  const ComponentWithHook = (props) => {
    const { prevStep, nextStep, activeStep } = useStep();
    const childRef = createRef();

    const onNextStep = () => {
      nextStep(() => {
        if (
          childRef &&
          childRef.current?.onNextStep &&
          typeof childRef.current.onNextStep === "function"
        ) {
          childRef.current.onNextStep();
        }
      });
    };

    const onBackStep = () => {
      prevStep(() => {
        if (
          childRef &&
          childRef.current.onNextStep &&
          typeof childRef.current.onNextStep === "function"
        ) {
          childRef.current.onBackStep();
        }
      });
    };

    useEffect(() => {
      console.log(activeStep);
    }, [activeStep]);

    return (
      <div className="step">
        <Card>
          <CardBody>
            <WrappedComponent ref={childRef} />
          </CardBody>
          <CardFooter>
            <div className="actions">
              {!activeStep?.isFirstStep && (
                <button onClick={onBackStep}>Back</button>
              )}
              {!activeStep?.isLastStep && (
                <button onClick={onNextStep}>Next</button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };
  return ComponentWithHook;
}

export default memo(Step);

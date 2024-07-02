import React, { memo } from "react";
function Step({ children }) {
  return <div className="step">{children}</div>;
}

export function HStep(WrappedComponent) {
  return function (props) {
    return (
      <div className="step">
        <div className=""></div>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export default memo(Step);

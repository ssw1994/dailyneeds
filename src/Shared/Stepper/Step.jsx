import React, { memo } from "react";
function Step({ children }) {
  return <div className="step">{children}</div>;
}

export default memo(Step);

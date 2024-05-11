import React from "react";

export default function FormGroup({ children, style, submitAction }) {
  return (
    <form
      onSubmit={(e) => {
        if (submitAction && typeof submitAction == "function") {
          submitAction(e);
        } else {
          e.preventDefault();
        }
      }}
      style={{ height: "fit-content", ...style }}
    >
      {children}
    </form>
  );
}

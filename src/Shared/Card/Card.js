import React from "react";

export default function Card({ children, style }) {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  );
}

import { React } from "react";
export default function Toaster({ toastMessage, style }) {
  const { message, isError } = toastMessage;
  const className = `toaster ${isError ? "error-toaster" : ""}`;
  return (
    <div
      className={className}
      style={{ ...style, color: isError ? "red" : "green" }}
    >
      <span>{message}</span>
    </div>
  );
}

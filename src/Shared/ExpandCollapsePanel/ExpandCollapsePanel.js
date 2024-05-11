import { useEffect, useState } from "react";

export default function ExpandCollapsePanel({
  title,
  children,
  defaultExpanded,
}) {
  const [expanded, toggleExpanded] = useState(false);
  useEffect(() => {
    toggleExpanded(defaultExpanded);
  }, [defaultExpanded]);
  return (
    <div className="expand-collapse-panel">
      <div
        className="expand-collapse-header flex-row-left-items"
        style={{ justifyContent: "space-between", alignItems: "center" }}
        onClick={() => toggleExpanded(!expanded)}
      >
        <span>{title}</span>
        <button>
          {expanded && (
            <span>
              <i className="fa-solid fa-chevron-up"></i>
            </span>
          )}
          {!expanded && (
            <span>
              <i className="fa-solid fa-chevron-down"></i>
            </span>
          )}
        </button>
      </div>
      <hr />
      {expanded && <div className="expand-collapse-body">{children}</div>}
    </div>
  );
}

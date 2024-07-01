import React, { useCallback, useContext, useEffect } from "react";
import { useTab } from "./useTab";

export function PlainTab({ children }) {
  const { activeTab } = useContext(TabContext);
  return <div>{children}</div>;
}

export const TabContext = React.createContext(null);

export default function Tabs({ children, getTabMeta, skipSteps }) {
  const { activeTab, setActiveTab, nextTab, prevTab, isLastTab } =
    useTab(children);
  const isActiveTab = useCallback(
    (c, i) => {
      if (activeTab.index === i || activeTab.name === c?.props?.header) {
        return true;
      }
      return false;
    },
    [children, activeTab]
  );

  useEffect(() => {
    getTabMeta &&
      getTabMeta({
        activeTab,
        setActiveTab,
        nextTab,
        prevTab,
        isLastTab,
      });
  }, [activeTab]);

  const TabHeaders = (() => {
    const tabs = React.Children.map(children, (child, index) => {
      return (
        <button
          className={
            isActiveTab(child, index)
              ? "active-tab tab-header-btn"
              : "inactive-tab tab-header-btn"
          }
          onClick={(e) => setActiveTab(index)}
          disabled={!skipSteps && index >= activeTab.index}
        >
          {child?.props?.header}
        </button>
      );
    });
    return tabs;
  })();

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, nextTab, prevTab, isLastTab }}
    >
      <div class="tabs">
        <div className="tab-header">{TabHeaders}</div>
        {React.Children.map(children, (child, index) => {
          return (
            <div
              style={{
                display: isActiveTab(child, index) ? "block" : "none",
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </TabContext.Provider>
  );
}

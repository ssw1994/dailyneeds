import React, { useEffect, useMemo, useState } from "react";
export const useTab = (children) => {
  const [activeTab, updateActiveTab] = useState({ name: null, index: null });

  const tabLength = useMemo(() => {
    return React.Children.count(children);
  }, [children]);

  useEffect(() => {
    setActiveTab(0);
  }, []);

  const isLastTab = useMemo(() => {
    return tabLength - 1 === activeTab.index;
  }, [tabLength, activeTab]);

  const setActiveTab = (tab) => {
    if (typeof tab === "number") {
      React.Children.map(children, (child, index) => {
        if (index === tab) {
          updateActiveTab({ name: child?.props?.header, index });
        }
      });
    }

    if (typeof tab === "string") {
      React.Children.map(children, (child, index) => {
        if (child?.props?.header === tab) {
          updateActiveTab({ name: child?.props?.header, index });
        }
      });
    }
  };

  const nextTab = () => {
    if (activeTab.index + 1 === tabLength) return;
    setActiveTab(activeTab.index + 1);
  };

  const prevTab = () => {
    if (activeTab.index === 0) return;
    setActiveTab(activeTab.index - 1);
  };

  return { activeTab, setActiveTab, nextTab, prevTab, isLastTab };
};

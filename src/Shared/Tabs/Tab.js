import React, { useContext } from "react";
import { TabContext } from "./Tabs";

export default function (WrappedComponent) {
  return function (props) {
    const tabMeta = useContext(TabContext);

    return <WrappedComponent {...props} {...tabMeta} />;
  };
}

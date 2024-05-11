import React, { useEffect } from "react";
import ExpandCollapsePanel from "../../../Shared/ExpandCollapsePanel/ExpandCollapsePanel";
import { BasicInfo } from "./ProfileInfo";
import { AddressInfo } from "./AddressInfo";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../Store";
import ChangePassword from "../ChangePassword/ChangePassword";

export function getViewTemplate(values, fields = null) {
  return Object.keys(values)
    .filter((value) => {
      if (fields && fields instanceof Array) {
        return fields.indexOf(value) >= 0;
      } else {
        return true;
      }
    })
    .map((key, index) => {
      return (
        <div className="flex-row-left-items key-values" key={key}>
          <div className="entity-label">{key}</div>
          <div className="entity-value">{values[key] ? values[key] : "NA"}</div>
        </div>
      );
    });
}

export default function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  return (
    <div className="profile flex-column-center-items">
      <section>
        <ExpandCollapsePanel title="Basic Info" defaultExpanded={true}>
          <BasicInfo />
        </ExpandCollapsePanel>
      </section>
      <section>
        <ExpandCollapsePanel title="Address">
          <AddressInfo />
        </ExpandCollapsePanel>
      </section>

      <section>
        <ExpandCollapsePanel title="Change Password">
          <ChangePassword />
        </ExpandCollapsePanel>
      </section>
    </div>
  );
}

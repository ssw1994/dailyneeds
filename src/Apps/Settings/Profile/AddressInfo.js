import React, { createRef, useEffect, useState } from "react";
import ExpandCollapsePanel from "../../../Shared/ExpandCollapsePanel/ExpandCollapsePanel";
import Card from "../../../Shared/Card/Card";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { FormControl } from "../../../Hooks/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { ADDRESS_TYPES, MODE } from "../../../Models";
import {
  deleteUserAddress,
  isAddressSavedSuccessfully,
  saveUserAddress,
  saveUserProfile,
  userAddressInfo,
  userProfileInfo,
} from "../../../Store";
import { getViewTemplate } from "./Profile";

export const AddressCard = ({ address, viewAddress }) => {
  const buttonRef = createRef();
  const [detailsPosition, updatePosition] = useState(null);
  const addressType = address?.addressType;
  let icon = <i class="fa-solid fa-house"></i>;

  if (addressType === "WORK") {
    icon = <i className="fa-solid fa-briefcase"></i>;
  } else if (addressType === "OTHER") {
    icon = <i className="fa-solid fa-location-pin"></i>;
  }

  const addressTemplate = (
    <Card
      style={{
        ...detailsPosition,
        position: "absolute",
        height: "max-content",
      }}
    >
      {getViewTemplate(address, [
        "houseNo",
        "societyName",
        "contactNumber",
        "city",
        "state",
        "country",
        "postalCode",
      ])}
    </Card>
  );

  const [isOpened, toggleDetails] = useState(false);

  const openDetails = (open) => {
    const position = buttonRef.current.getBoundingClientRect();
    updatePosition({
      top: position.y - 150,
      left: position.x + 150,
    });
    toggleDetails(open);
  };

  return (
    <>
      <button
        onClick={() => viewAddress(address)}
        onMouseEnter={() => openDetails(true)}
        onMouseLeave={() => openDetails(false)}
        ref={buttonRef}
      >
        {icon}
        {addressType}
      </button>
      {isOpened && addressTemplate}
    </>
  );
};

export const SavedAddress = ({ toggleMode }) => {
  const addresses = useSelector(userAddressInfo);

  return (
    <div className="user-addresses">
      {addresses?.map((address, index) => {
        return (
          <AddressCard key={index} address={address} viewAddress={toggleMode} />
        );
      })}
      <button onClick={toggleMode}>
        <i class="fa-solid fa-plus"></i>
        ADD ADDRESS
      </button>
    </div>
  );
};

export const AddEditAddress = ({ addressInfo, toggleMode }) => {
  const dispatch = useDispatch();
  const isAddressSaved = useSelector(isAddressSavedSuccessfully);
  const [addressForm, updateAddressForm, reset, patchValue] = useFormGroup(
    new FormGroup({
      houseNo: new FormControl("houseNo", "", true),
      societyName: new FormControl("societyName", "", true),
      contactNumber: new FormControl("contactNumber", "", true),
      postalCode: new FormControl("postalCode", "", true),
      city: new FormControl("city", "", true),
      state: new FormControl("state", "", true),
      country: new FormControl("country", "", true),
      addressType: new FormControl("addressType", "OTHER", true),
      _id: new FormControl("_id", null),
    })
  );

  useEffect(() => {
    if (isAddressSaved) {
      toggleMode();
    }
  }, [isAddressSaved]);

  useEffect(() => {
    if (addressInfo) {
      patchValue(addressInfo);
    }
  }, [addressInfo]);

  const updateForm = (e, ctrl) => {
    updateAddressForm(ctrl, e?.target?.value);
  };

  const getCtrl = (name) => {
    return addressForm?.getCtrl(name) ?? null;
  };

  const saveAddress = () => {
    const value = addressForm.getValue();
    dispatch(saveUserAddress(value));
  };

  const deleteAddress = () => {
    dispatch(deleteUserAddress({ id: addressInfo?._id }));
  };

  return (
    <Card>
      <UIFormGroup>
        <div className="flex-row-left-items">
          <UIFormControl control={getCtrl("houseNo")}>
            <input
              value={getCtrl("houseNo")?.value}
              onChange={(e) => updateForm(e, "houseNo")}
            />
          </UIFormControl>
          <UIFormControl control={getCtrl("societyName")}>
            <input
              value={getCtrl("societyName")?.value}
              onChange={(e) => updateForm(e, "societyName")}
            />
          </UIFormControl>
        </div>
        <div className="flex-row-left-items">
          <UIFormControl control={getCtrl("contactNumber")}>
            <input
              value={getCtrl("contactNumber")?.value}
              onChange={(e) => updateForm(e, "contactNumber")}
            />
          </UIFormControl>
          <UIFormControl control={getCtrl("city")}>
            <input
              value={getCtrl("city")?.value}
              onChange={(e) => updateForm(e, "city")}
            />
          </UIFormControl>
        </div>
        <div className="flex-row-left-items">
          <UIFormControl control={getCtrl("state")}>
            <input
              value={getCtrl("state")?.value}
              onChange={(e) => updateForm(e, "state")}
            />
          </UIFormControl>
          <UIFormControl control={getCtrl("country")}>
            <input
              value={getCtrl("country")?.value}
              onChange={(e) => updateForm(e, "country")}
            />
          </UIFormControl>
        </div>
        <div className="flex-row-left-items">
          <UIFormControl control={getCtrl("postalCode")}>
            <input
              value={getCtrl("postalCode")?.value}
              onChange={(e) => updateForm(e, "postalCode")}
            />
          </UIFormControl>
          <UIFormControl control={getCtrl("addressType")}>
            <select
              value={getCtrl("addressType")?.value}
              onChange={(e) => updateForm(e, "addressType")}
            >
              {ADDRESS_TYPES.map((type) => {
                return (
                  <option value={type} key={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </UIFormControl>
        </div>
        <div className="flex-row-center-items">
          <button onClick={toggleMode}>Cancel</button>
          <button onClick={saveAddress}>
            {addressInfo?._id ? "Update" : "Save"}
          </button>
          {addressInfo?._id && <button onClick={deleteAddress}>Delete</button>}
        </div>
      </UIFormGroup>
    </Card>
  );
};

export const AddressInfo = ({ addressInfo }) => {
  const [mode, updateMode] = useState(MODE.VIEW);
  const [selectedAddress, updateSelectedAddress] = useState(null);

  const toggleMode = (address) => {
    updateSelectedAddress(address);
    updateMode(mode === MODE.VIEW ? MODE.EDIT : MODE.VIEW);
  };

  if (mode === MODE.VIEW) {
    return <SavedAddress toggleMode={toggleMode} />;
  }

  return (
    <AddEditAddress addressInfo={selectedAddress} toggleMode={toggleMode} />
  );
};

import Step from "../../../Shared/Stepper/Step";
import Stepper from "../../../Shared/Stepper/Stepper";
import { AddressDetails } from "./AddressDetails";
import { OrderDetails } from "./OrderDetails";
import { PaymentDetails } from "./PaymentDetails";
import { ReviewAndConfirmDetails } from "./ReviewAndConfirmDetails";

import HOCAddressDetails from "./AddressDetails";
import HOCOrderDetails from "./OrderDetails";
import HOCPaymentDetails from "./PaymentDetails";
import HOCReviewAndConfirmDetails from "./ReviewAndConfirmDetails";
import {
  AddressInfo,
  HOCAddressInfo,
} from "../../Settings/Profile/AddressInfo";
import React, { useRef, useState } from "react";

export const CheckoutContext = React.createContext(null);
// import {
//   OrderDetails,
//   ReviewAndConfirmDetails,
//   AddressDetails,
//   PaymentDetails,
// } from ".";
export default function Checkout() {
  const [checkoutDetails, updateCheckoutDetails] = useState({
    orderDetails: null,
    addressDetails: null,
    paymentDetails: null,
  });

  if (false) {
    return (
      <Stepper skipSteps={false} defaultSteps={true}>
        <Step header="Order Details">
          <OrderDetails />
        </Step>
        <Step header="Address Details">
          <AddressDetails />
        </Step>
        <Step header="Payment Details">
          <PaymentDetails />
        </Step>
        <Step header="Review">
          <ReviewAndConfirmDetails />
        </Step>
      </Stepper>
    );
  }
  return (
    <CheckoutContext.Provider
      value={{ checkoutDetails, updateCheckoutDetails }}
    >
      <Stepper skipSteps={false} defaultSteps={true}>
        <HOCOrderDetails header="Order Details" />
        <HOCAddressDetails header="Address Details" />
        <HOCPaymentDetails header="Payment Details" />
        <HOCReviewAndConfirmDetails header="Review & Confirm" />
      </Stepper>
    </CheckoutContext.Provider>
  );
}

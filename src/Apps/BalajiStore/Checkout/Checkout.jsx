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
import { AddressInfo } from "../../Settings/Profile/AddressInfo";
// import {
//   OrderDetails,
//   ReviewAndConfirmDetails,
//   AddressDetails,
//   PaymentDetails,
// } from ".";
export default function Checkout() {
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
    <Stepper skipSteps={false} defaultSteps={true}>
      <HOCOrderDetails header="Order Details" />
      <AddressInfo header="Address Details" />
      {/* <HOCAddressDetails header="Address Details" /> */}
      <HOCPaymentDetails header="Payment Details" />
      <HOCReviewAndConfirmDetails header="Review & Confirm" />
    </Stepper>
  );
}

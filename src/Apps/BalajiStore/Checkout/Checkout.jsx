import Step from "../../../Shared/Stepper/Step";
import Stepper from "../../../Shared/Stepper/Stepper";
import { AddressDetails } from "./AddressDetails";
import { OrderDetails } from "./OrderDetails";
import { PaymentDetails } from "./PaymentDetails";
import { ReviewAndConfirmDetails } from "./ReviewAndConfirmDetails";
// import {
//   OrderDetails,
//   ReviewAndConfirmDetails,
//   AddressDetails,
//   PaymentDetails,
// } from ".";
export default function Checkout() {
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

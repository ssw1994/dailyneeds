import OrderSummary from "../../../Shared/OrderSummary/OrderSummary";
import Step from "../../../Shared/Stepper/Step";
import Stepper from "../../../Shared/Stepper/Stepper";
import { AddressInfo } from "../../Settings/Profile/AddressInfo";

export default function Checkout() {
  return (
    <Stepper>
      <Step header="Order Details">
        <OrderSummary />
      </Step>
      <Step header="Address Details">
        <AddressInfo />
      </Step>
      <Step header="Payment Details"></Step>
      <Step header="Review"></Step>
    </Stepper>
  );
}

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useContext,
  useState,
} from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";
import { CheckoutContext } from "./Checkout";
import { getViewTemplate } from "../../Settings/Profile/Profile";
import { placeOrder } from "../../../Store";
import { useDispatch } from "react-redux";

export const ReviewAndConfirmDetails = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return { onNextStep, onBackStep };
  });
  const onNextStep = () => {
    console.log("ReviewAndConfirmDetails Next Step");
  };
  const onBackStep = () => {
    console.log("ReviewAndConfirmDetails Back Step");
  };

  const { checkoutDetails } = useContext(CheckoutContext);
  const [isDetailsConfirmed, updateUserConfirmation] = useState(false);
  useEffect(() => {
    console.log(checkoutDetails);
  }, [checkoutDetails]);

  const dispatch = useDispatch();

  const initiateOrder = () => {
    dispatch(placeOrder(checkoutDetails));
  };
  return (
    <div>
      <fieldset>
        <legend>
          Order Details
          <span style={{ color: "green" }}>
            ({checkoutDetails?.orderDetails?.orderTotal})
          </span>
        </legend>
        {checkoutDetails?.orderDetails?.products?.map((product, index) => {
          return (
            <>
              {getViewTemplate(product, [
                "name",
                "price",
                "quantity",
                "totalPrice",
              ])}
              {index + 1 !==
                checkoutDetails?.orderDetails?.products?.length && <hr />}
            </>
          );
        })}
      </fieldset>
      <fieldset>
        <legend>Delivery Address</legend>
        {getViewTemplate(checkoutDetails?.addressDetails, [
          "houseNo",
          "societyName",
          "contactNumber",
          "city",
          "state",
          "country",
          "postalCode",
        ])}
      </fieldset>
      <fieldset>
        <legend>Payment Details</legend>
        {checkoutDetails?.paymentDetails}
      </fieldset>
      <div className="flex-column-center-items">
        <div className="w-100">
          <input
            type="checkbox"
            id="accept_order"
            checked={isDetailsConfirmed}
            onChange={(e) => updateUserConfirmation(!isDetailsConfirmed)}
            style={{ width: "20px", height: "20px" }}
          />
          <label for="accept_order">Confirmed Details</label>
        </div>
        <button disabled={!isDetailsConfirmed} onClick={initiateOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
});

export default HStep(ReviewAndConfirmDetails, "Review");

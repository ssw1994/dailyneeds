import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useContext,
} from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import http from "../../../Services";
import { useSelector } from "react-redux";
import { cartItems } from "../../../Store";
import ExpandCollapsePanel from "../../../Shared/ExpandCollapsePanel/ExpandCollapsePanel";
import { CheckoutContext } from "./Checkout";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const { orderTotal } = useSelector(cartItems);
  // Fetch client secret from backend
  const createPaymentIntent = async () => {
    try {
      http
        .processPayment({ amount: orderTotal })
        .then((response) => {
          setClientSecret(response?.clientSecret);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, [orderTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setSuccess(true);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing || success}>
        {processing ? "Processing…" : "Pay"}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment successful!</div>}
    </form>
  );
};

export const PaymentDetails = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return { onNextStep, onBackStep };
  });
  const onNextStep = () => {
    updateCheckoutDetails((prev) => {
      return {
        ...prev,
        paymentDetails: selectedPaymentMode,
      };
    });
    console.log("PaymentDetails Next Step");
  };
  const { updateCheckoutDetails } = useContext(CheckoutContext);
  const onBackStep = () => {
    console.log("PaymentDetails Back Step");
  };

  const payment_modes = [
    {
      name: "Credit Card",
      disabled: true,
      message: "Payment mode is not avialble for now",
      element: <CheckoutForm />,
    },
    {
      name: "Debit Card",
      disabled: true,
      message: "Payment mode is not avialble for now",
      element: <CheckoutForm />,
    },
    { name: "Cash on Delivery" },
  ];

  const [selectedPaymentMode, updateSelectedPaymentMode] =
    useState("Cash on Delivery");

  return (
    <div>
      <div className="payment_modes">
        {payment_modes.map((mode) => {
          return (
            <div className="flex-row-left-items" style={{ width: "100%" }}>
              <div>
                <label for={mode.name}>{mode.name}</label>
                <input
                  type="radio"
                  name="payment_mode"
                  value={mode.name}
                  key={mode.name}
                  id={mode.name}
                  checked={selectedPaymentMode === mode.name}
                  onChange={(e) => updateSelectedPaymentMode(e.target.value)}
                  style={{ display: "inline-block", width: "auto !important" }}
                  disabled={mode.disabled}
                  title={mode.message}
                />
              </div>
              {mode.name === selectedPaymentMode && mode.element}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default HStep(PaymentDetails, "Payment Details");

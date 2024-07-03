import React, { forwardRef, useImperativeHandle } from "react";
import { HStep } from "../../../Shared/Stepper/Step";
import useStep from "../../../Shared/Stepper/useStep";
import { useSelector } from "react-redux";
import { cartItems } from "../../../Store/App.selector";
import { Gallery } from "../../../Shared/Gallery/Gallery";

export const OrderDetails = forwardRef((props, ref) => {
  const { products, orderTotal } = useSelector(cartItems);
  useImperativeHandle(ref, () => {
    return { onNextStep };
  });
  const onNextStep = () => {
    console.log("OrderDetails Next step");
  };
  console.log(products);
  return (
    <div className="order-details">
      {products?.map((product) => {
        return (
          <div className="product-row">
            <div className="images">
              <Gallery images={product?.images} onlyImage={true} />
            </div>
            <div className="name">{product?.name}</div>
            <div className="price">{product?.price}</div>
            <div className="quantity">{product?.quantity}</div>
            <div className="total-price">{product?.totalPrice}</div>
          </div>
        );
      })}
      <div className="order-total">{orderTotal}</div>
    </div>
  );
});

export default HStep(OrderDetails, "Order Details");

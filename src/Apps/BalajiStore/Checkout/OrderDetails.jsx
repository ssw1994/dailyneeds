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
      <table>
        <thead>
          <tr className="product-row">
            <th className="images">Images</th>
            <th className="name">Name</th>
            <th className="price">Price</th>
            <th className="quantity">Quantity</th>
            <th className="total-price">Total</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => {
            return (
              <tr className="product-row">
                <td className="images">
                  <Gallery images={product?.images} onlyImage={true} />
                </td>
                <td className="name">{product?.name}</td>
                <td className="price">{product?.price}</td>
                <td className="quantity">{product?.quantity}</td>
                <td className="total-price">{product?.totalPrice}</td>
              </tr>
            );
          })}
          <tr className="order-total">
            <td colSpan={5}>{orderTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default HStep(OrderDetails, "Order Details");

import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { cartItems } from "../../Store";
export default function OrderSummary() {
  const cartSummary = useSelector(cartItems);
  return (
    <div className="summary">
      <Card>
        <table className="cart-summary">
          <thead>
            <tr>
              <th>Produce name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartSummary?.products?.map((item) => {
              return (
                <tr key={item.name}>
                  <td>{item?.name?.substring(0, 20)} ...</td>
                  <td>{item?.price}</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.totalPrice}</td>
                </tr>
              );
            })}
            <tr>
              <td>Total : </td>
              <td colSpan={3}>{cartSummary?.orderTotal}</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <div className="flex-row-center-items">
        <button style={{ width: "100%" }}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

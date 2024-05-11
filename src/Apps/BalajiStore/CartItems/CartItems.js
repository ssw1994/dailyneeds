import { useDispatch, useSelector } from "react-redux";
import {
  cartItems,
  fetchCartItems,
  removeFromCart,
  updateItemQuantity,
} from "../../../Store";
import { useEffect } from "react";
import { Gallery } from "../../../Shared/Gallery/Gallery";
import Counter from "../../../Shared/Counter/Counter";
import Card from "../../../Shared/Card/Card";
import OrderSummary from "../../../Shared/OrderSummary/OrderSummary";
import { useNavigate } from "react-router";
export function CartItem({ productDetails }) {
  const dispatch = useDispatch();
  const quantiyUpdated = (q) => {
    dispatch(
      updateItemQuantity({ productId: productDetails?._id, quantity: q })
    );
  };

  const deleteItem = () => {
    if (!productDetails?._id) return;
    dispatch(removeFromCart({ productId: productDetails?._id }));
  };
  return (
    <Card className="cart-item" style={{ width: "90%" }}>
      <div className="flex-row-left-items">
        <div style={{ width: "35%" }}>
          <Gallery
            images={productDetails?.images}
            imageStyle={{ maxHeight: "300px", border: "0px" }}
            galleryStyle={{ border: "0px" }}
          />
        </div>
        <div style={{ width: "60%", marginLeft: "2%" }}>
          <div>
            <h3>{productDetails?.name}</h3>
          </div>
          <div>
            <h2>
              <i class="fa-solid fa-indian-rupee-sign"></i>
              {productDetails?.price}
            </h2>
          </div>
          <div>
            <Counter
              initialValue={productDetails.quantity}
              min={1}
              max={productDetails?.stock}
              valueChange={quantiyUpdated}
            />
            <button onClick={deleteItem}>
              <i className="fa-solid fa-trash"></i>Delete Item
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CartItems() {
  const items = useSelector(cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const continueShopping = () => {
    navigate("/shop");
  };

  console.log(items);

  if (!items || items?.length === 0) {
    return (
      <Card
        style={{
          width: "90%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div className="flex-column-center-items">
          <h3>No Cart Items Found</h3>
          <button onClick={continueShopping}>
            <i className="fa-solid fa-cart-shopping"></i>
            Continue Shopping
          </button>
        </div>
      </Card>
    );
  }
  return (
    <div
      className="user-cart flex-row-center-items"
      style={{ alignItems: "flex-start", gap: "15px" }}
    >
      <div
        className="cart-items flex-column-left-items"
        style={{ width: "70%" }}
      >
        {items?.products?.map((item, index) => {
          return <CartItem key={index} productDetails={item} />;
        })}
      </div>
      <OrderSummary />
    </div>
  );
}

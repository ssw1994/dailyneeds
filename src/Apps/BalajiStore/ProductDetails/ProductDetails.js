import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchProducts, productDetails } from "../../../Store";
import { Gallery } from "../../../Shared/Gallery/Gallery";
import Card from "../../../Shared/Card/Card";
import CardFooter from "../../../Shared/Card/CardFooter";
import BuyButton from "../../../Shared/BuyButton/BuyButton";
export default function ProductDetails() {
  const details = useSelector(productDetails);
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    dispatch(fetchProducts({ id: params?.id ?? null }));
  }, []);

  return (
    <div className="product-details">
      <Card style={{ width: "85%", height: "100%" }}>
        <div className="flex-row-left-items product">
          <div className="imgs">
            <Gallery images={details?.images} />
          </div>
          <div className="details">
            <div className="product-name">{details?.name}</div>
            <div className="product-price">
              <i class="fa-solid fa-indian-rupee-sign"></i>
              {details?.price}
            </div>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: details?.description }}
            ></div>
          </div>
        </div>
        <CardFooter>
          <div className="action">
            <BuyButton type="wish" id={params?.id}>
              <i class="fa-regular fa-heart"></i>
              ADD TO WISHLIST
            </BuyButton>
            <BuyButton type="cart" id={params?.id}>
              <i class="fa-solid fa-cart-plus"></i> ADD TO CART
            </BuyButton>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, products } from "../../../Store";
import { useEffect } from "react";
import CardBody from "../../../Shared/Card/CardBody";
import Card from "../../../Shared/Card/Card";
import { Gallery } from "../../../Shared/Gallery/Gallery";
import { useNavigate } from "react-router";
import { NoRecords } from "../../../Shared";

export const ProductCard = ({ price, name, images, _id }) => {
  const navigate = useNavigate();
  const gotoProductDetails = () => {
    navigate("/shop/details/" + _id);
  };
  return (
    <Card>
      <CardBody>
        <div className="product" onClick={gotoProductDetails}>
          <div className="product-image">
            <Gallery
              images={images}
              onlyImage={true}
              galleryStyle={{ border: "0px" }}
              imageStyle={{ border: "0px" }}
            />
          </div>
          <div className="product-price">
            <i class="fa-solid fa-indian-rupee-sign"></i>
            {price}
          </div>
          <div className="product-name">{name}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default function Products() {
  const allProducts = useSelector(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!allProducts || allProducts?.length <= 0) {
    return <NoRecords />;
  }

  return (
    <div className="product-list flex-row-left-items">
      {allProducts?.map((product, index) => {
        return <ProductCard {...product} key={index} />;
      })}
    </div>
  );
}

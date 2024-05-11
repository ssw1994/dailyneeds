import { useDispatch } from "react-redux";
import { addToCartOrWish } from "../../Store";

export default function BuyButton({ children, type, id }) {
  const dispatch = useDispatch();
  const handleClickAction = () => {
    dispatch(
      addToCartOrWish({
        type,
        id,
      })
    );
  };

  return <button onClick={handleClickAction}>{children}</button>;
}

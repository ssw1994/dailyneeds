import { forwardRef } from "react";

export const CardImage = forwardRef(({ img, alt, ref }) => {
  return <img ref={ref} src={img} alt={alt}></img>;
});

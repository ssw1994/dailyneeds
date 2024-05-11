import React, { forwardRef, useEffect, useState } from "react";
import { setActiveApp } from "../../Store";

export const Image = forwardRef(({ image, url, alt, style, onClick }, ref) => {
  const setActiveImage = () => {
    if (onClick && typeof onClick === "function") {
      onClick(image);
    }
  };
  const s = style
    ? style
    : {
        width: "100%",
        height: "100%",
      };
  return (
    <img
      ref={ref}
      style={s}
      src={url}
      alt={alt}
      onClick={() => setActiveImage()}
    />
  );
});

export const ThumbNails = ({ images, style, setActiveImage }) => {
  const image = (image, index) => (
    <Image
      onClick={setActiveImage}
      key={index}
      {...image}
      image={image}
      style={{
        height: "30px",
        width: "30px",
        border: "1px solid currentColor",
      }}
    />
  );

  return <div className="flex-row-left-items">{images?.map(image)}</div>;
};

export const Gallery = ({
  images,
  imageStyle,
  auto,
  onlyImage,
  galleryStyle,
}) => {
  const [activeImage, setActiveImage] = useState();
  useEffect(() => {
    setActiveImage(images && images.length > 0 ? images[0] : null);
  }, [images]);

  // useEffect(() => {
  //   let intervalId = null;
  //   if (auto) {
  //     intervalId = setInterval(() => {
  //       let activeIndex = images.findIndex(
  //         (image) => activeImage?.url === image?.url
  //       );
  //       let nextIndex = (images.length % activeIndex) + 1;
  //       setActiveImage(images[nextIndex]);
  //     }, 3000);
  //   }
  //   return () => {
  //     intervalId && clearInterval(intervalId);
  //   };
  // }, [auto, images]);

  if (!images) {
    return (
      <div
        className="flex-row-center-items"
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid currentColor",
          ...galleryStyle,
        }}
      >
        No Images
      </div>
    );
  }

  const getActiveImage = (image) => {
    setActiveImage(image);
  };

  return (
    <div
      className="gallery flex-column-center-items"
      style={{
        border: "1px solid currentColor",
        padding: "5px",
        height: "100%",
        width: "100%",
        ...galleryStyle,
      }}
    >
      <div className="img-gallery">
        <Image {...activeImage} style={imageStyle} />
        {/* {images?.map((image, index) => (
          <Image {...image} style={imageStyle} key={index} />
        ))} */}
      </div>
      {!onlyImage && (
        <ThumbNails images={images} setActiveImage={getActiveImage} />
      )}
    </div>
  );
};

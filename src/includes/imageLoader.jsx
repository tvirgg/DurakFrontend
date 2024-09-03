import React, { useState } from "react";

const ImageLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="image">
      {loading && <div className="image-preloader"></div>}
      <img
        className={`img ${loading ? "hidden" : ""}`}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImageLoader;

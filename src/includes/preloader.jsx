import React, { useState, useEffect } from "react";
import {
  SuitClubFill,
  SuitDiamondFill,
  SuitHeartFill,
  SuitSpadeFill,
} from "react-bootstrap-icons";

const Preloader = () => {
  const [isActive, setIsActive] = useState(true);

  function disableScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
  }

  function enableScroll() {
    document.body.style.overflow = "";
    document.body.style.position = "";
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const handleImagesLoaded = () => {
      const images = Array.from(document.images);
      const imagePromises = images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        setIsActive(false);
        enableScroll();
      });
    };

    disableScroll();

    // Запуск проверки загрузки изображений
    handleImagesLoaded();

    return () => {
      const m = document.querySelector(".page");
      m?.classList.add("page-loaded");
    };
  }, []);

  return (
    <div className={`preloader ${isActive ? "" : "preloader-deactive"}`}>
      <div className="content">
        <span>LOADING</span>
        <div className="loader">
          <SuitClubFill color="#fff" className="s1" />
          <SuitDiamondFill color="#fff" className="s2" />
          <SuitHeartFill color="#fff" className="s3" />
          <SuitSpadeFill color="#fff" className="s4" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;

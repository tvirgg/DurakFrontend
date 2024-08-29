import React, { useState, useRef, useEffect } from "react";

const ProgressBar = ({ values = [] }) => {
  const [progress, setProgress] = useState(0); // Индекс текущей точки
  const progressTrackRef = useRef(null);
  const handlerRef = useRef(null);

  useEffect(() => {
    if (progressTrackRef.current && handlerRef.current) {
      const dots = progressTrackRef.current.querySelectorAll(".dot");
      const trackBounds = progressTrackRef.current.getBoundingClientRect();
      const dotsArray = Array.from(dots);

      // Определение центров точек
      const dotCenters = dotsArray.map((dot) => {
        const rect = dot.getBoundingClientRect();
        return rect.left + rect.width / 2 - trackBounds.left;
      });

      // Позиционирование хандлера относительно центра точки
      const handlerWidth = handlerRef.current.offsetWidth;
      const leftPosition = dotCenters[progress] - handlerWidth / 2;

      // Установка позиции хандлера
      handlerRef.current.style.transform =
        leftPosition !== 0
          ? `translateX(${leftPosition}px)`
          : `translateX(3px)`;
    }
  }, [progress, values]); // Обновляем при изменении values

  const handleTouchMove = (e) => {
    // e.preventDefault(); // Для предотвращения скроллинга при перемещении
    const touch = e.touches[0];
    const trackBounds = progressTrackRef.current.getBoundingClientRect();
    const dots = progressTrackRef.current.querySelectorAll(".dot");

    let newLeft = touch.clientX - trackBounds.left;

    // Ограничение движения в пределах трека
    newLeft = Math.max(0, Math.min(newLeft, trackBounds.width));

    // Определение ближайшей точки
    const dotCenters = Array.from(dots).map((dot) => {
      const rect = dot.getBoundingClientRect();
      return rect.left + rect.width / 2 - trackBounds.left;
    });

    const closestDotIndex = dotCenters.reduce(
      (closestIndex, current, index) => {
        return Math.abs(current - newLeft) <
          Math.abs(dotCenters[closestIndex] - newLeft)
          ? index
          : closestIndex;
      },
      0
    );

    setProgress(closestDotIndex);
  };

  const handleTouchStart = (e) => {
    progressTrackRef.current.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    progressTrackRef.current.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
  };

  const handleTouchEnd = () => {
    progressTrackRef.current.removeEventListener("touchmove", handleTouchMove);
    progressTrackRef.current.removeEventListener("touchend", handleTouchEnd);
  };

  const handleClick = (e) => {
    const trackBounds = progressTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - trackBounds.left;

    // Определение ближайшей точки
    const dots = progressTrackRef.current.querySelectorAll(".dot");
    const dotCenters = Array.from(dots).map((dot) => {
      const rect = dot.getBoundingClientRect();
      return rect.left + rect.width / 2 - trackBounds.left;
    });

    const closestDotIndex = dotCenters.reduce(
      (closestIndex, current, index) => {
        return Math.abs(current - clickX) <
          Math.abs(dotCenters[closestIndex] - clickX)
          ? index
          : closestIndex;
      },
      0
    );

    setProgress(closestDotIndex);
  };

  return (
    <div className="progress-bar">
      <div
        className="progress-track"
        ref={progressTrackRef}
        onTouchStart={handleTouchStart}
        onClick={handleClick} // Обработка кликов
      >
        <div className="handler" ref={handlerRef}></div>
        {values.map((_, index) => (
          <span key={index} className="dot">
            <span className="num">{values[index]}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

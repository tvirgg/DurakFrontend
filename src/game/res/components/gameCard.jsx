import React, { forwardRef, useState } from "react";

const GameCard = forwardRef(
  ({ id, type, name, value, style, ...props }, ref) => {
    const [userCosmetic] = useState(
      JSON.parse(localStorage.getItem("user_cosmetic"))
    );

    return (
      <img
        ref={ref}
        className={`game_card ${name}`}
        data-name={name}
        data-type={type}
        data-value={value}
        data-id={id}
        {...props}
        style={{
          ...style,
          backgroundImage: `url(/res/skins${
            userCosmetic?.find((item) => item.cosmetic?.type === "card")
              ?.cosmetic?.link
          })`,
        }}
      ></img>
    );
  }
);

export default GameCard;

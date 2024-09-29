import React from 'react';
import changeCard from "../game/res/cards/changeCard.svg";

export const Table = ({onClickChangeCard}) => {
    return (
        <div className="gameplay__table">
            <div className="gameplay__table-enemy-side">
            </div>
            <div className="gameplay__table-main-side">
            <img 
                onClick={onClickChangeCard}
                alt="Card"
                className="gameplay__change-card"
                src={changeCard}
            />
            </div>
        </div>
    );
}
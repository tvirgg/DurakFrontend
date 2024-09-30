import React, {useState} from 'react';
import { Card } from './card';
import cardBackSvg from "../game/res/cards/cardBack.svg";

export const Deck = ({trumpCard}) => {
    const [activeCosmetic] = useState(
        JSON.parse(localStorage.getItem("user_cosmetic"))
    );

    const cosmeticLink = activeCosmetic?.find((item) => item.cosmetic?.type === "card")?.cosmetic?.link;
    const cardBack = cosmeticLink ? `res/skins${cosmeticLink}` : cardBackSvg;

    return (
        <div className="gameplay__deck">
            <img 
                alt=""
                className="gameplay__card-back"
                src={cardBack}
            />
            <Card card={trumpCard} className="gameplay__trump-card" />
        </div>
    )
}
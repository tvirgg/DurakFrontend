import React, { useEffect, useState } from 'react';
import { Card } from './card';

export const Hand = ({cards, attack}) => {
    const [activeId, setActiveId] = useState(null);

    const getHandleClick = (id) => () => {
        setActiveId((prev) => prev === id ? null : id);
    }

    return (
        <div className="gameplay__hand">
            {cards?.map((card, index) => {
                return (
                    <Card
                        attack={attack && `${card.name + card.nominal}` === activeId}
                        card={card} 
                        key={index} 
                        onClick={getHandleClick(card.name + card.nominal)} 
                        active={`${card.name + card.nominal}` === activeId}
                        style={{transform: `rotate(-8deg) translateX(${-index*45}px) translateY(${-index*7}px)`}}
                    />
                )
            })}
        </div>
    )
}
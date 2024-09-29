import React from 'react';

export const Enemies = ({enemies}) => {
    return (
        <div className="gameplay__enemies">
            {enemies?.map((enemy, index) => {
                return (
                    <div className="gameplay__enemy-wrapper">
                        <img
                            key={index}
                            className="gameplay__enemy"
                            src={`https://t.me/i/userpic/160/${enemy.user.tgNickname}.jpg`}
                            alt="player_picture"
                        />
                    </div>
                )
            })}
        </div>
    )
}
import { useState } from "react"
import { Deck } from "./deck"
import { Enemies } from "./enemies"
import "./gameplay.css"
import { Hand } from "./hand"
import { TimerZone } from "./timer"
import { Table } from "./table"

export const Gameplay = () => {
    const [attack, setAttack] = useState();
    const [user] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const [gameStatus] = useState(
        JSON.parse(localStorage.getItem("game_status"))
    );

    const handleAttack = () => {
        setAttack(new Date());
    }

    return (
        <div className="gameplay">
            <Enemies enemies={gameStatus?.players?.filter((player) => player.id !== user?.id)} />
            <TimerZone />
            <Table onClickChangeCard={handleAttack} />
            <Deck trumpCard={gameStatus?.trumpCard} />
            <Hand attack={attack} cards={gameStatus?.players?.find((player) => player.id === user?.id)?.cards ?? []}/>
        </div>
    )
}
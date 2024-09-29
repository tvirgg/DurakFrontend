import { useState } from "react"
import Timer from "../game/res/components/timer"

export const TimerZone = () => {
    const [timerActive, setTimerActive] = useState(true);

    const handleFinish = (finished) => {
        setTimerActive(!finished);
    }

    return (
        <div className="gameplay__timer-zone">
            <Timer onFinish={handleFinish} isActive={timerActive} duration={15} />
        </div>
    )
}
import React, { useEffect, useState } from "react";
import "../../styles/GameArea/Timer.css";

interface TimerProps {
    initialTime: number;
    gameState: "start" | "playing" | "finished";
    onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({
    initialTime,
    gameState,
    onTimeUp,
}) => {
    const [time, setTime] = useState<number>(initialTime);

    useEffect(() => {
        if (gameState !== "playing") {
            setTime(initialTime);
            return;
        }

        if (time <= 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 0.1);
        }, 100);

        return () => clearInterval(timer);
    }, [time, gameState, initialTime, onTimeUp]);

    return <div className="timer">残り：{Math.round(time)}s</div>;
};

export default Timer;
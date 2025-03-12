import React, { useState } from "react";
import "../../styles/GameArea/GameArea.css";
import Timer from "./Timer";
import Score from "./Score";
import GameScreen from "./GameScreen";

const GameArea: React.FC = () => {
    const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");

    const handleStart = () => {
        setGameState("playing");
    };

    const handleTimeUp = () => {
        setGameState("finished");
        alert("Time's up!");
    };

    const handleRetry = () => {
        setGameState("start");
    };

    return (
        <div className="game-container">
            <div className="game-header">
                <Timer
                    initialTime={20}
                    gameState={gameState}
                    onTimeUp={handleTimeUp}
                />
                <Score />
            </div>
            <GameScreen
                gameState={gameState}
                onStart={handleStart}
                onRetry={handleRetry}
            />
        </div>
    );
};

export default GameArea;
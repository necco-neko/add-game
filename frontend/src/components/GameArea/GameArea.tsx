import React, { useState } from "react";
import "../../styles/GameArea/GameArea.css";
import Timer from "./Timer";
import Score from "./Score";
import GameScreen from "./GameScreen";

const GameArea: React.FC = () => {
    const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");
    const [score, setScore] = useState<number>(0);

    const handleStart = () => {
        setGameState("playing");
        setScore(0);
    };

    const handleTimeUp = () => {
        setGameState("finished");
        alert("Time's up!");
    };

    const handleRetry = () => {
        setGameState("start");
        setScore(0);
    };

    const handleAddScore = (size: number, isOverfowing: boolean) => {
        const baseScore = 100;
        let addScore = Math.round(baseScore * (50 / size));

        if (size <= 5) {
            addScore *= 3;
        }

        if (isOverfowing) {
            addScore *= 3;
        }

        setScore((prev) => prev + addScore);
    };

    return (
        <div className="game-container">
            <div className="game-header">
                <Timer
                    initialTime={20}
                    gameState={gameState}
                    onTimeUp={handleTimeUp}
                />
                <Score
                    score={score}
                />
            </div>
            <GameScreen
                gameState={gameState}
                onStart={handleStart}
                onRetry={handleRetry}
                onScore={handleAddScore}
            />
        </div>
    );
};

export default GameArea;
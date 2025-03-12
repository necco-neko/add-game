import React from "react";
import "../../styles/GameArea/GameArea.css";
import Timer from "./Timer";
import Score from "./Score";
import GameScreen from "./GameScreen";

const GameArea: React.FC = () => {
    return (
        <div className="game-container">
            <div className="game-header">
                <Timer />
                <Score />
            </div>
            <GameScreen />
        </div>
    );
};

export default GameArea;
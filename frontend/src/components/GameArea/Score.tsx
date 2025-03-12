import React from "react";
import "../../styles/GameArea/Score.css";

interface ScoreProps {
    score: number;
}

const Score: React.FC<ScoreProps> = ({
    score,
}) => {
    return (
        <div className="score">
            スコア: {score}
        </div>
    )
};

export default Score;
import React from "react";
import "../../styles/GameArea/GameScreen.css";

interface GameScreenProps {
    gameState: "start" | "playing" | "finished";
    onStart: () => void;
    onRetry: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
    gameState,
    onStart,
    onRetry,
}) => {
    return (
        <div className="game-screen">
            {/* スタート前 */}
            {gameState === "start" && (
                <button className="start-button" onClick={onStart}>
                    スタート
                </button>
            )}
            {/* ゲーム中 */}
            {gameState === "playing" && (
                <div>ゲーム中...</div>
            )}
            {/* ゲーム終了後 */}
            {gameState === "finished" && (
                <button className="retry-button" onClick={onRetry}>
                    リトライ
                </button>
            )}
        </div>
    )
};

export default GameScreen;
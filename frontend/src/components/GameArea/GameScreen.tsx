import React, { useEffect, useState } from "react";
import "../../styles/GameArea/GameScreen.css";

interface GameScreenProps {
    gameState: "start" | "playing" | "finished";
    onStart: () => void;
    onRetry: () => void;
}

interface XButton {
    id: number;
    top: number;
    left: number;
    size: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
    gameState,
    onStart,
    onRetry,
}) => {
    const [xButtons, setXButtons] = useState<XButton[]>([]);

    useEffect(() => {
        if (gameState === "playing") {
            generateXButtons();
        }
    }, [gameState]);

    const generateXButtons = () => {
        const buttonCount = Math.floor(Math.random() * 5) + 1; // 1〜5個
        const newButtons: XButton[] = [];

        for (let i = 0; i < buttonCount; i++) {
            const size = Math.floor(Math.random() * (50 - 1 + 1)) + 20; // 1〜50px
            const top = Math.random() * 100; // ゲームエリア内の範囲
            const left = Math.random() * 100; // ゲームエリア内の範囲

            newButtons.push({ id: i, top, left, size });
        }

        setXButtons(newButtons);
    };

    const handleClickXButton = (id: number) => {
        setXButtons((prevButtons) => prevButtons.filter(button => button.id !== id));

        // 全部消えたら新しい広告を生成
        if (xButtons.length === 1) {
            generateXButtons();
        }
    };

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
                <>
                    {xButtons.map((button) => (
                        <img
                            key={button.id}
                            src="/icons/XIcon.png" // public/icons/x-icon.png のパス
                            alt="×ボタン"
                            className="x-icon"
                            style={{
                                top: `${button.top}%`,
                                left: `${button.left}%`,
                                width: `${button.size}px`,
                                height: `${button.size}px`,
                            }}
                            onClick={() => handleClickXButton(button.id)}
                        />
                    ))}
                </>
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
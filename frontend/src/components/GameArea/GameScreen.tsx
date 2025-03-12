import React, { useEffect, useState } from "react";
import "../../styles/GameArea/GameScreen.css";

interface GameScreenProps {
    gameState: "start" | "playing" | "finished";
    onStart: () => void;
    onRetry: () => void;
    onScore: (score: number, isOverfowing: boolean) => void;
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
    onScore,
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
            const size = Math.floor(Math.random() * (50 - 3 + 1)) + 3; // 3〜50px
            const minPosition = -(size / 400) / 2; // 完全に画面外に出ないように最小値を設定
            const maxPosition = 97; // 完全に画面外に出ないように最大値を設定
            const top = Math.random() * (maxPosition - minPosition) + minPosition;; // ゲームエリア内の範囲
            const left = Math.random() * (maxPosition - minPosition) + minPosition;; // ゲームエリア内の範囲
            console.log(size, top, left);
            newButtons.push({ id: i, top, left, size });
        }

        setXButtons(newButtons);
    };

    const handleClickXButton = (id: number, size: number, top: number, left: number) => {
        const isOverfowing = top < 0 || left < 0 || top + (size / 400) * 100 > 100 || left + (size / 400) * 100 > 100; // はみ出しているか判定
        onScore(size, isOverfowing);
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
                            onClick={() => handleClickXButton(button.id, button.size, button.top, button.left)}
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
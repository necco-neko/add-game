import React, { useEffect, useState } from "react";
import "../../styles/GameArea/GameArea.css";
import Timer from "./Timer";
import Score from "./Score";
import GameScreen from "./GameScreen";

interface GameAreaProps {
    setIsUpdated: (updated: boolean) => void;
}

const GameArea: React.FC<GameAreaProps> = ({
    setIsUpdated
}) => {
    const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");
    const [score, setScore] = useState<number>(0);
    const [isRanked, setIsRanked] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string>("");

    const handleStart = () => {
        setGameState("playing");
        setScore(0);
        setPlayerName("");
    };

    const handleTimeUp = async () => {
        setGameState("finished");
        alert("Time's up!");
        await checkIsRanked();
    };

    const handleRetry = () => {
        setGameState("start");
        setScore(0);
        setIsRanked(false);
        setPlayerName("");
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

    const checkIsRanked = async () => {
        try {
            const API_BASE_URL = process.env.REACT_APP_API_URL || "";
            const response = await fetch(`${API_BASE_URL}/api/rankings`);
            const data = await response.json();
            const rankings = data || [];

            // 取得したランキングデータと現在のスコアを比較
            const isNewTop10 = rankings.length < 10 || rankings[9].score < score;

            if (isNewTop10) {
                const name = prompt("ランクイン！お名前を入力してください：")?.trim();

                if (name) {
                    setPlayerName(name);
                    setIsRanked(true);
                }
            }
        } catch (error) {
            console.error("ランキング情報の取得に失敗しました:", error);
        }
    };

    // ランキング更新処理
    useEffect(() => {
        if (isRanked && playerName) {
            // ランキング情報をDBに送信
            const newRanking = { name: playerName, score };
            const API_BASE_URL = process.env.REACT_APP_API_URL || "";
            fetch(`${API_BASE_URL}/api/rankings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRanking),
            })
                .then((response) => response.json())
                .then(() => {
                    console.log("ランキングが更新されました");
                    setIsRanked(false);
                    setIsUpdated(true);
                })
                .catch((error) => console.error("ランキング登録に失敗しました:", error));
        }
    }, [isRanked, playerName, score, setIsUpdated]);

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
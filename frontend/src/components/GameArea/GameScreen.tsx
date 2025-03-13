import React, { useCallback, useEffect, useState } from "react";
import "../../styles/GameArea/GameScreen.css";

interface GameScreenProps {
    gameState: "start" | "playing" | "finished";
    onStart: () => void;
    onRetry: () => void;
    onScore: (score: number, isOverfowing: boolean) => void;
}

interface AdObject {
    // アイコン
    id: number;
    top: number;
    left: number;
    size: number;
    // 画像
    imageUrl: string;
    width: number;
    height: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
    gameState,
    onStart,
    onRetry,
    onScore,
}) => {
    const [ads, setAds] = useState<AdObject[]>([]);
    const [imagePool, setImagePool] = useState<string[]>([]);
    const [backgroundImage, setBackgroundImage] = useState<string>("");

    useEffect(() => {
        if (gameState === "playing") {
            fetchPexelsImages();
        }
    }, [gameState]);

    const fetchPexelsImages = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/pexels/images"); // クエリを指定する場合は/images?query=~~~で指定する
            const data = await response.json();
            if (data.images) {
                setImagePool(data.images.map((img: any) => img.src)); // 画像のURLの配列を保存
            }
        } catch (error) {
            console.error("画像の取得に失敗しました:", error);
        }
    };

    useEffect(() => {
        console.log("背景更新");
        setBackgroundImage(imagePool[Math.floor(Math.random() * imagePool.length)]);
    }, [imagePool]);

    const generateAds = useCallback(() => {
        if (imagePool.length === 0) return;

        const adCount = Math.floor(Math.random() * 5) + 1; // 1〜5個
        const newAds: AdObject[] = [];

        for (let i = 0; i < adCount; i++) {
            // アイコン
            const size = Math.floor(Math.random() * (50 - 3 + 1)) + 3; // 3〜50px
            const minPosition = -(size / 400) / 2; // 完全に画面外に出ないように最小値を設定
            const maxPosition = 97; // 完全に画面外に出ないように最大値を設定
            const top = Math.random() * (maxPosition - minPosition) + minPosition;; // ゲームエリア内の範囲
            const left = Math.random() * (maxPosition - minPosition) + minPosition;; // ゲームエリア内の範囲
            // 画像
            const imageUrl = imagePool[Math.floor(Math.random() * imagePool.length)];
            const width = Math.floor(Math.random() * 150) + 100;
            const height = Math.floor(Math.random() * 150) + 100;
            newAds.push({
                id: i,
                top,
                left,
                size,
                imageUrl,
                width,
                height
            });
        }

        setAds(newAds);
    }, [imagePool]);

    useEffect(() => {
        if (gameState === "playing" && imagePool.length > 0) {
            generateAds();
        }
    }, [gameState, imagePool, generateAds]);

    const handleClickXButton = (id: number, size: number, top: number, left: number) => {
        const isOverfowing = top < 0 || left < 0 || top + (size / 400) * 100 > 100 || left + (size / 400) * 100 > 100; // はみ出しているか判定
        onScore(size, isOverfowing);
        setAds((prev) => prev.filter(ad => ad.id !== id));

        // 全部消えたら新しい広告を生成
        if (ads.length === 1) {
            generateAds();
        }
    };

    return (
        <div
            className="game-screen"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
            }}
        >
            {/* スタート前 */}
            {gameState === "start" && (
                <button className="start-button" onClick={onStart}>
                    スタート
                </button>
            )}
            {/* ゲーム中 */}
            {gameState === "playing" && 
                ads.map((ad) => (
                    <div
                        key={ad.id}
                        className="ad-container"
                        style={{
                            top: `${ad.top}%`,
                            left: `${ad.left}%`,
                            zIndex: ad.id,
                        }}
                    >
                        {/* アイコン */}
                        <img
                            src="/icons/XIcon.png"
                            alt="×ボタン"
                            className="x-icon"
                            style={{
                                width: `${ad.size}px`,
                                height: `${ad.size}px`,
                            }}
                            onClick={() => handleClickXButton(ad.id, ad.size, ad.top, ad.left)}
                        />
                        {/* 広告画像（アイコンの下に配置） */}
                        <img
                            src={ad.imageUrl}
                            alt="広告"
                            className="ad-image"
                            style={{
                                width: `${ad.width}px`,
                                height: `${ad.height}px`,
                                zIndex: ad.id + 1,
                            }}
                        />
                    </div>
                ))
            }
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
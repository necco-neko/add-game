import React, { useCallback, useEffect, useState } from "react";
import "../styles/Ranking.css";

interface RankingProps {
    isUpdated: boolean;
    setIsUpdated: (updated: boolean) => void;
}

interface RankingObject {
    name: string;
    score: number;
}

const Ranking: React.FC<RankingProps> = ({
    isUpdated,
    setIsUpdated,
}) => {
    const [rankings, setRankings] = useState<RankingObject[]>([]);

    const fetchRankings = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5001/api/rankings");
            const data = await response.json();
            setRankings(data || []);
            setIsUpdated(false);
        } catch (error) {
            console.error("ランキング情報の取得に失敗しました:", error);
        }
    }, [setIsUpdated]);
    
    // ランキングデータを取得
    useEffect(() => {
        fetchRankings();
    }, [fetchRankings]); // 初回レンダリング時

    useEffect(() => {
        if (isUpdated) {
            fetchRankings();
        }
    }, [isUpdated, fetchRankings]); // ランキング情報更新時

    return (
        <div className="ranking">
            <h2>ランキング</h2>
            <ul>
                {rankings.map((ranking, index) => (
                    <li key={index} className="ranking-item">
                        {index + 1}位: {ranking.name} --- {ranking.score}点
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ranking;
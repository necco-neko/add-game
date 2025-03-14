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
            const API_BASE_URL = process.env.REACT_APP_API_URL || "";
            const response = await fetch(`${API_BASE_URL}/api/rankings`);
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
            <table className="ranking-table">
                <thead>
                    <tr>
                        <th>順位</th>
                        <th>プレイヤー名</th>
                        <th>スコア</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking, index) => (
                        <tr key={index} className={`rank-${index + 1}`}>
                            <td>{index + 1}位</td>
                            <td className="player-name">{ranking.name}</td>
                            <td>{ranking.score}点</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ranking;
import React, { useEffect, useState } from "react";
import "../styles/Ranking.css";

interface Ranking {
    name: string;
    score: number;
}

const Ranking: React.FC = () => {
    const [rankings, setRankings] = useState<Ranking[]>([]);
    
    // ランキングデータを取得
    useEffect(() => {
        fetch("http://localhost:5001/api/rankings")
            .then((response) => response.json())
            .then((data) => setRankings(data))
            .catch((error) => console.error("ランキング取得エラー:", error));
    }, []);

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
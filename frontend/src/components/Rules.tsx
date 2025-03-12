import React from "react";
import "../styles/Rules.css";

const Rules: React.FC = () => {
    return (
        <div className="rules">
            <h2>ゲームのルール</h2>
            <p>・×ボタンをクリックして広告を閉じる</p>
            <p>・誤って広告をクリックすると時間減少</p>
            <p>・制限時間内にスコアを稼ぐ</p>
        </div>
    );
};

export default Rules;
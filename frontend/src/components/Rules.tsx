import React from "react";
import "../styles/Rules.css";

const Rules: React.FC = () => {
    return (
        <div className="rules-container">
            {/* ルールエリア */}
            <div className="rules-section">
                <div>
                    <div className="rules-header">ルール</div>
                    <ul className="rules-ul">
                        <li>×ボタンをクリックするとスコア増加</li>
                        <li>×ボタン以外をクリックするとスコア減少</li>
                        <li>スコアは×ボタンのサイズ等によって変動</li>
                    </ul>
                </div>
            </div>

            {/* 画面幅が十分広い時は縦線で区切る */}
            <div className="rules-vertical-divider"></div>

            {/* 画面幅が狭い時は横線で区切る */}
            <div className="rules-horizontal-divider"></div>
            
            {/* その他エリア */}
            <div className="rules-section">
                <div>
                    <div className="rules-header">その他（注意等）</div>
                    <ul className="rules-ul">
                        <li>ランキングは10位まで表示</li>
                        <li>プレイヤー名が不適切な場合（空欄/空白のみ 等）、登録されないことがあります</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Rules;
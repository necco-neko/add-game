import React, { useState } from "react";
import Title from "./Title";
import Rules from "./Rules";
import GameArea from "./GameArea/GameArea";
import Ranking from "./Ranking";
import "../styles/GameLayout.css";

const GameLayout: React.FC = () => {
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    return (
        <div className="game-layout">
            <header className="title-area">
                <Title />
            </header>
            <section className="rules-area">
                <Rules />
            </section>
            <main className="content">
                <section className="game-area">
                    <GameArea setIsUpdated={setIsUpdated} />
                </section>
                <aside className="ranking-area">
                    <Ranking isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                </aside>
            </main>
        </div>
    );
};

export default GameLayout;
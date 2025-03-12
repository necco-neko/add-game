import React from "react";
import Title from "./Title";
import Rules from "./Rules";
import GameArea from "./GameArea/GameArea";
import Ranking from "./Ranking";
import "../styles/GameLayout.css";

const GameLayout: React.FC = () => {
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
                    <GameArea />
                </section>
                <aside className="ranking-area">
                    <Ranking />
                </aside>
            </main>
        </div>
    );
};

export default GameLayout;
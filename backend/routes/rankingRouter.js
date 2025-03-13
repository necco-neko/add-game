const express = require("express");
const Ranking = require("../models/Ranking");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const rankings = await Ranking.find().sort({ score: -1 });
        res.status(200).json(rankings);
    } catch (error) {
        console.error("ランキング取得エラー:", error);
        res.status(500).json({ error: "ランキング取得に失敗しました" });
    }
});

router.post("/", async (req, res) => {
    console.log("POST /api/rankings にリクエスト:", req.body);
    const { name, score } = req.body;

    try {
        // リクエストをチェック
        if (!name || typeof score !== "number") {
            console.log("リクエストに不備があります", req.body);
            return res.status(400).json({ error: "名前とスコアが必要です" });
        }

        // 現在のランキングデータを全て取得
        const currentRankings = await Ranking.find().sort({ score: -1 });

        // 新しいランキングデータ
        const newRanking = new Ranking({
            name,
            score
        });

        // 新しいデータをランキングに追加
        currentRankings.push(newRanking);

        // スコアで降順に並べ替え
        currentRankings.sort((a, b) => b.score - a.score);

        // ランキングが10件を超える場合、一番下のデータを削除
        if (currentRankings.length > 10) {
            currentRankings.pop(); // 最下位のデータを削除
        }

        // DBに更新されたランキングを保存
        await Ranking.deleteMany({}); // 古いデータを全て削除
        await Ranking.insertMany(currentRankings); // 新しいデータを挿入

        res.status(201).json({
            message: "ランキング登録成功",
            ranking: newRanking
        });
    } catch (error) {
        console.error("ランキング登録エラー:", error);
        res.status(500).json({ error: "サーバーエラー" });
    }
});

module.exports = router;
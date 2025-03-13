const express = require("express");
const Ranking = require("../models/Ranking");

const router = express.Router();

// 📝 ランキングを取得（上位10位）
router.get("/", async (req, res) => {
    try {
        const rankings = await Ranking.find().sort({ score: -1 }).limit(10);
        res.json(rankings);
    } catch (error) {
        console.error("ランキング取得エラー:", error);
        res.status(500).json({ error: "サーバーエラー" });
    }
});

// 📝 ランキングを追加
router.post("/", async (req, res) => {
    console.log("✅ POST /api/rankings にリクエスト:", req.body);

    try {
        const { name, score } = req.body;

        if (!name || typeof score !== "number") {
            console.log("✅ POST /api/rankings にリクエスト:", req.body);
            return res.status(400).json({ error: "名前とスコアが必要です" });
        }

        const newRanking = new Ranking({ name, score });
        await newRanking.save();

        console.log("✅ データが保存されました:", newRanking);
        res.status(201).json({ message: "ランキング登録成功", ranking: newRanking });
    } catch (error) {
        console.error("ランキング登録エラー:", error);
        res.status(500).json({ error: "サーバーエラー" });
    }
});

module.exports = router;
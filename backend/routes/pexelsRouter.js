const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/images", async (req, res) => {
    try {
        const query = req.query.query || "cat";
        const perPage = 5; // 取得する画像の数

        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`, {
            headers: {
                Authorization: process.env.PEXELS_API_KEY || "",
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "画像のフェッチに失敗しました" });
        }

        const data = await response.json();
        const images = data.photos.map((photo) => ({
            id: photo.id,
            src: photo.src.medium,
            width: photo.width,
            height: photo.height,
        }));

        res.json({ images });
    } catch (error) {
        console.error("画像フェッチエラー:", error);
        res.status(500).json({ error: "サーバーエラー" });
    }
});

module.exports = router;
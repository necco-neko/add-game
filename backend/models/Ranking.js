const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Ranking = mongoose.model("Ranking", RankingSchema);

module.exports = Ranking;
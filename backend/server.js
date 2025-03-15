const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// ルーター
const pexelsRouter = require("./routes/pexelsRouter");
const rankingRouter = require("./routes/rankingRouter");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDBに接続しました"))
  .catch((err) => console.log("MongoDB接続エラー:", err));

app.use("/api/pexels", pexelsRouter);
app.use("/api/rankings", rankingRouter);

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
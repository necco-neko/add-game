const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pexelsRouter = require("./routes/pexelsRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/pexels", pexelsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
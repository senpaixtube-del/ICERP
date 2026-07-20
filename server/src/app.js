const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");


const app = express();


app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.get("/", (req, res) => {
    res.json({
        project: "ICERP",
        status: "Online"
    });
});


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
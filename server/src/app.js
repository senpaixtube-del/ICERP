const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");


const app = express();


// Security Headers
app.use(
    helmet({
        contentSecurityPolicy: true,
        xssFilter: true
    })
);


// CORS
app.use(
    cors({
        origin: [
            "https://icerp.vercel.app",
            "http://localhost:3000"
        ],
        credentials: true
    })
);


// Limit requests (Anti brute force)
const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    message: {
        message: "Too many requests"
    }

});


app.use(limiter);


// Body parser
app.use(express.json({
    limit: "10kb"
}));


app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);



module.exports = app;
const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");

const {
    register,
    login,
    refresh,
    logout
} = require("../controllers/authController");


// Register protection
const registerLimiter = rateLimit({

    windowMs: 60 * 60 * 1000, // 1 hour

    max: 5, // max 5 accounts per IP

    message: {
        message: "Too many registration attempts. Try again later."
    },

    standardHeaders: true,
    legacyHeaders: false

});


// Login protection
const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 10,

    message: {
        message: "Too many login attempts. Try again later."
    },

    standardHeaders: true,
    legacyHeaders: false

});



router.post(
    "/register",
    registerLimiter,
    register
);


router.post(
    "/login",
    loginLimiter,
    login
);


router.post(
    "/refresh",
    refresh
);


router.post(
    "/logout",
    logout
);



module.exports = router;
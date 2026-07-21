const express = require("express");

const router = express.Router();

const {
    stats
} = require("../controllers/dashboardController");


router.get(
    "/stats",
    stats
);


module.exports = router;
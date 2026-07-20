const router = require("express").Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.get(
    "/panel",
    auth,
    admin("founder", "owner", "manager"),
    (req, res) => {

        res.json({
            message: "Welcome ICERP Admin Panel 👑",
            user: req.user
        });

    });


module.exports = router;
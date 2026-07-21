const router = require("express").Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const prisma = require("../prisma/client");


// Admin Panel
router.get(
    "/panel",
    auth,
    admin("founder", "owner", "manager"),
    (req, res) => {

        res.json({
            message: "Welcome ICERP Admin Panel 👑",
            user: req.user
        });

    }
);


// TEMP: Change user role
// فقط برای تست - بعداً حذف شود
router.put(
    "/make-owner/:id",
    async (req, res) => {

        try {

            const user = await prisma.user.update({

                where: {
                    id: Number(req.params.id)
                },

                data: {
                    role: "owner"
                }

            });


            res.json({

                message: "Role updated successfully",
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }

            });


        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Role update failed"
            });

        }

    }
);


module.exports = router;
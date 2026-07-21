const router = require("express").Router();


const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


const {

    getUsers,
    changeRole,
    deleteUser

} = require("../controllers/adminController");





router.get(
    "/users",
    auth,
    admin("founder", "owner", "manager"),
    getUsers
);





router.put(
    "/users/:id/role",
    auth,
    admin("founder", "owner"),
    changeRole
);





router.delete(
    "/users/:id",
    auth,
    admin("founder"),
    deleteUser
);




module.exports = router;
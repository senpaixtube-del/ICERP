const prisma = require("../prisma/client");


// Get all users
exports.getUsers = async (req, res) => {

    try {

        const users = await prisma.user.findMany({

            select: {

                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true

            }

        });


        res.json(users);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};




// Change user role
exports.changeRole = async (req, res) => {


    try {


        const { role } = req.body;

        const { id } = req.params;



        const user = await prisma.user.update({

            where: {
                id: Number(id)
            },

            data: {
                role
            }


        });



        res.json({

            message: "Role updated",

            user

        });



    } catch (error) {


        console.log(error);


        res.status(500).json({

            message: "Server error"

        });


    }


};




// Delete user
exports.deleteUser = async (req, res) => {


    try {


        const { id } = req.params;


        await prisma.user.delete({

            where: {
                id: Number(id)
            }

        });



        res.json({

            message: "User deleted"

        });



    } catch (error) {


        console.log(error);


        res.status(500).json({

            message: "Server error"

        });


    }


};
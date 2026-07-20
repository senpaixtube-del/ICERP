const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../prisma/client");



exports.register = async (req, res) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;


        const hash = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({

            data: {
                username,
                email,
                password: hash
            }

        });


        res.json({

            message: "Account created",

            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }

        });


    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};




exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;



        const user = await prisma.user.findUnique({

            where: {
                email
            }

        });



        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }



        const valid = await bcrypt.compare(
            password,
            user.password
        );


        if (!valid) {

            return res.status(401).json({
                message: "Wrong password"
            });

        }



        const token = jwt.sign(

            {
                id: user.id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );



        res.json({

            token,

            user: {
                username: user.username,
                role: user.role
            }

        });


    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};
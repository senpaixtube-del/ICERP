const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");


exports.register = async (req, res) => {
    try {

        const { username, email, password } = req.body;


        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }


        const exists = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if (exists) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }


        const hash = await bcrypt.hash(password, 12);


        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hash
            }
        });


        res.status(201).json({
            message: "Account created",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};


exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await prisma.user.findUnique({
            where: { email }
        });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const match = await bcrypt.compare(
            password,
            user.password
        );


        if (!match) {
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
                expiresIn: "15m",
                issuer: "ICERP",
                audience: "ICERP_USERS"
            }
        );


        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
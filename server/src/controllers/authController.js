const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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



        // Access Token (short life)
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



        // Refresh Token
        const refreshToken = crypto
            .randomBytes(64)
            .toString("hex");



        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id
            }
        });



        // HttpOnly Cookie
        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000
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

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};

// Refresh Access Token
exports.refresh = async (req, res) => {

    try {

        const token = req.cookies.refreshToken;


        if (!token) {
            return res.status(401).json({
                message: "No refresh token"
            });
        }


        const savedToken = await prisma.refreshToken.findUnique({
            where: {
                token
            }
        });


        if (!savedToken) {
            return res.status(403).json({
                message: "Invalid refresh token"
            });
        }



        const newAccessToken = jwt.sign(
            {
                id: savedToken.userId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
                issuer: "ICERP",
                audience: "ICERP_USERS"
            }
        );



        res.json({
            token: newAccessToken
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};





// Logout
exports.logout = async (req, res) => {

    try {

        const token = req.cookies.refreshToken;


        if (token) {

            await prisma.refreshToken.deleteMany({
                where: {
                    token
                }
            });

        }


        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }
        );


        res.json({
            message: "Logged out"
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};
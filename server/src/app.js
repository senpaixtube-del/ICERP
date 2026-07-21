const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const adminUsersRoutes = require("./routes/adminUsers");


const app = express();



// =========================
// Security Headers
// =========================

app.use(
    helmet({
        contentSecurityPolicy: false,
        xssFilter: true
    })
);



// =========================
// CORS
// =========================


const allowedOrigins = [

    "https://icerp.vercel.app",

    "https://icerp-lvdmm04ts-senpaixtube-dels-projects.vercel.app",

    "http://localhost:3000"

];



app.use(
    cors({

        origin: function (origin, callback) {


            // اجازه برای Postman و server-to-server
            if (!origin) {

                return callback(null, true);

            }



            // دامنه های مجاز
            if (

                allowedOrigins.includes(origin)

                ||

                origin.endsWith(".vercel.app")

            ) {

                return callback(null, true);

            }



            return callback(
                new Error("Not allowed by CORS")
            );


        },


        credentials: true,


        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],


        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]

    })
);



// =========================
// Rate Limit
// =========================


const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,


    message: {

        message:
            "Too many requests"

    },


    standardHeaders: true,

    legacyHeaders: false

});


app.use(limiter);



// =========================
// Body Parser
// =========================


app.use(
    express.json({

        limit: "10kb"

    })
);



// =========================
// Cookies
// =========================


app.use(cookieParser());



// =========================
// Routes
// =========================


app.use(
    "/api/auth",
    authRoutes
);



app.use(
    "/api/admin",
    adminRoutes
);



app.use(
    "/api/admin",
    adminUsersRoutes
);



// =========================
// Health Check
// =========================


app.get("/", (req, res) => {

    res.json({

        status: "ICERP Server Online 🚀"

    });

});



module.exports = app;
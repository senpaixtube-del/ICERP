const prisma = require("../prisma/client");


exports.stats = async (req, res) => {

    try {

        const users = await prisma.user.count();

        const tickets = await prisma.ticket.count();

        const payments = await prisma.payment.count();


        const revenue = await prisma.payment.aggregate({

            _sum: {
                amount: true
            },

            where: {
                status: "success"
            }

        });


        res.json({

            users,

            tickets,

            payments,

            revenue: revenue._sum.amount || 0

        });


    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
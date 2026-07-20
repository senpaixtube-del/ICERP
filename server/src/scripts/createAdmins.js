const prisma = require("../prisma/client");


async function main() {

    await prisma.user.update({
        where: {
            email: "soroush@icerp.com"
        },
        data: {
            role: "founder"
        }
    });


    await prisma.user.create({
        data: {
            username: "subhan",
            email: "subhan@icerp.com",
            password: "123456",
            role: "owner"
        }
    });


    await prisma.user.create({
        data: {
            username: "haj-mousavi",
            email: "mousavi@icerp.com",
            password: "123456",
            role: "manager"
        }
    });


    console.log("ICERP Admins Created 👑");

}


main()
    .finally(async () => {
        await prisma.$disconnect();
    });
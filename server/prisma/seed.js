const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    // Staff
    await prisma.staff.createMany({
        data: [
            {
                name: "سروش یوسفی",
                position: "Founder"
            },
            {
                name: "سبحان",
                position: "Owner"
            },
            {
                name: "حاج موسوی گیم",
                position: "Manager"
            }
        ]
    });


    // Gang Packages
    await prisma.gangPackage.createMany({
        data: [
            {
                name: "Bronze",
                price: 300,
                features: "قابلیت های برنزی"
            },
            {
                name: "Silver",
                price: 600,
                features: "قابلیت های نقره ای"
            },
            {
                name: "Gold",
                price: 100000,
                features: "قابلیت های طلایی"
            }
        ]
    });


    // Settings
    await prisma.setting.createMany({
        data: [
            {
                key: "support_number",
                value: "09383399258"
            },
            {
                key: "server_name",
                value: "ICERP"
            }
        ]
    });


    console.log("ICERP Seed Completed ✅");
}


main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
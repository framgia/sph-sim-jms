import { PrismaClient } from "@prisma/client";

import seedUsers from "./seeders/user.seed";

async function seed() {
    const prisma = new PrismaClient();

    try {
        await prisma.$transaction(async () => {
            await seedUsers();
            // add other seeder files here
        });
    } catch (error) {
        console.log('Error seeding database');
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seed();

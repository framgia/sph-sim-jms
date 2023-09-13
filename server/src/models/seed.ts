import { PrismaClient } from "@prisma/client";

import seedCustomers from './seeders/customer.seed';
import seedEstimations from './seeders/estimation';
import seedJobs from './seeders/job.seed';
import seedSchedules from './seeders/schedule.seed';
import seedUsers from "./seeders/user.seed";

async function seed() {
    const prisma = new PrismaClient();

    try {
        await prisma.$transaction(async () => {
            await seedUsers();
            await seedCustomers();
            await seedJobs();
            await seedEstimations();
            await seedSchedules();
        });
    } catch (error) {
        console.log('Error seeding database');
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seed();

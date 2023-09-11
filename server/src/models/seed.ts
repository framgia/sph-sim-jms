import { PrismaClient } from "@prisma/client";

import seedUsers from "./seeders/user.seed";
import seedJobs from "./seeders/job.seed";
import seedCustomers from "./seeders/customer.seed";
import seedSchedules from "./seeders/schedule.seed";

async function seed() {
  const prisma = new PrismaClient();

  try {
    await prisma.$transaction(async () => {
      await seedUsers();
      await seedCustomers();
      await seedJobs();
      await seedSchedules();
      // add other seeder files here
    });
  } catch (error) {
    console.log("Error seeding database");
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();

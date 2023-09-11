import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";

export default async function seedJobs() {
  const prisma = new PrismaClient();

  const jobData: Prisma.JobCreateManyInput[] = Array.from({ length: 5 }).map(
    () => ({
      title: faker.commerce.productName(),
      type: faker.commerce.product(),
      remarks: faker.lorem.sentence({ min: 5, max: 10 }),
      customerId: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
      userId: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
    }),
  );

  await prisma.job.createMany({
    data: jobData,
  });
}

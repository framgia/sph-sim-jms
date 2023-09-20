import { faker } from '@faker-js/faker';
import { PaymentMethod, PrismaClient, Tag } from '@prisma/client';

export default async function seedJobs() {
  const prisma = new PrismaClient();

  const paymentMethod = Object.values(PaymentMethod);
  const tags = Object.values(Tag);
  const seedDataCount = 20;
  let jobData = [];

  for (let i = 0; i < seedDataCount; i++) {
    const newJob = {
      title: faker.lorem.words(),
      type: faker.lorem.word(),
      userId: faker.number.int({ min: 1, max: 5 }),
      customerId: i + 1,
      paymentMethod: faker.helpers.arrayElement(paymentMethod),
      tags: faker.helpers.arrayElements(tags, { min: 1, max: 3 })
    };
    jobData = [...jobData, newJob];
  }

  await prisma.job.createMany({
    data: jobData
  });
}

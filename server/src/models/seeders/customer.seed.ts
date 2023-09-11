import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";

export default async function seedCustomers() {
  const prisma = new PrismaClient();

  const customerData: Prisma.CustomerCreateManyInput[] = Array.from({
    length: 5,
  }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    contact: faker.phone.number(),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
  }));

  await prisma.customer.createMany({
    data: customerData,
  });
}

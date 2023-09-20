import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export default async function seedCustomers() {
  const prisma = new PrismaClient();

  const seedDataCount = 20;
  let customerData = [];

  for (let i = 0; i < seedDataCount; i++) {
    const newCustomer = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      contact: faker.phone.number('+63 9# ### ## ##'),
      address: faker.location.streetAddress(true)
    };
    customerData = [...customerData, newCustomer];
  }

  await prisma.customer.createMany({
    data: customerData
  });
}

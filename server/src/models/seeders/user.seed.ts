import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export default async function seedUsers() {
    const prisma = new PrismaClient();

    const seedDataCount = 5;
    let userData = [];

    for (let i = 0; i < seedDataCount; i++) {
        const newUser = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
        }
        userData = [...userData, newUser]
    }

    await prisma.user.createMany({
        data: userData
    })
}

import { faker } from '@faker-js/faker';
import { PrismaClient, Status } from '@prisma/client';

export default async function seedEstimations() {
    const prisma = new PrismaClient();

    const status = Object.values(Status);
    const seedDataCount = 20
    let estimationData = [];

    for (let i = 0; i < seedDataCount; i ++) {
        const newEstimation = {
            title: faker.lorem.word(),
            document: faker.system.commonFileName('pdf'),
            totalCost: faker.finance.amount({min: 1000, max: 10000, dec: 2}),
            status: faker.helpers.arrayElement(status),
            jobId: i + 1,
        }
        estimationData = [...estimationData, newEstimation]
    }

    await prisma.estimation.createMany({
        data: estimationData
    })
}

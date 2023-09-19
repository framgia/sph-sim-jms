import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export default async function seedSchedules() {
    const prisma = new PrismaClient();

    const seedDataCount = 20;
    let scheduleData = [];

    for (let i = 0; i < seedDataCount; i++) {
        const newSchedule = {
            startDate:  faker.date.soon(),
            endDate: faker.date.soon(),
            startTime: faker.date.soon(),
            endTime: faker.date.soon(),
            jobId: faker.number.int({ min: 1, max: 20 })
        }
        scheduleData = [...scheduleData, newSchedule]
    }

    await prisma.schedule.createMany({
        data: scheduleData
    });
}

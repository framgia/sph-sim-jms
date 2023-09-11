import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";

export default async function seedSchedules() {
  const prisma = new PrismaClient();

  const scheduleData: Prisma.ScheduleCreateManyInput[] = Array.from({
    length: 5,
  }).map(() => {
    const randomStartHours = Math.floor(Math.random() * 19) + 1;
    const randomOffsetHours = Math.floor(Math.random() * 3) + 1;

    const startTime = new Date(
      `2023-09-15T${padNumToString(randomStartHours, 2, "0")}:00:00.000Z`,
    );
    const endTime = new Date(
      `2023-09-15T${padNumToString(
        randomStartHours + randomOffsetHours,
        2,
        "0",
      )}:00:00.000Z`,
    );

    return {
      jobId: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
      startDate: faker.date.between({
        from: "2023-09-01T00:00:00.000Z",
        to: "2023-09-15T00:00:00.000Z",
      }),
      endDate: faker.date.between({
        from: "2023-09-15T00:00:00.000Z",
        to: "2023-09-30T00:00:00.000Z",
      }),
      startTime,
      endTime,
    };
  });

  await prisma.schedule.createMany({
    data: scheduleData,
  });
}

const padNumToString = (num: number, digits: number, padString: string) => {
  return num.toString().padStart(digits, padString);
};

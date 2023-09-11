import { Test } from "@nestjs/testing";
import { PrismaService } from "../../database/connection.service";
import { ScheduleService } from "./schedule.service";
import { GetScheduleQueryDto } from "./dtos/get-schedule.dto";
import { Schedule } from "@prisma/client";

describe("ScheduleService", () => {
  let scheduleService: ScheduleService;
  let prisma: PrismaService;

  const mockPrisma = {
    job: {
      groupBy: jest.fn(),
    },
    schedule: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ScheduleService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    scheduleService = moduleRef.get<ScheduleService>(ScheduleService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe("create", () => {
    it("should return a schedule", async () => {
      const date = new Date();

      const scheduleInput = {
        startDate: "2023-01-02T01:00:00.000Z",
        endDate: "2023-01-02T01:00:00.000Z",
        startTime: "2023-01-02T01:00:00.000Z",
        endTime: "2023-01-02T01:00:00.000Z",
        jobId: 1,
      };

      const schedule = {
        id: 1,
        startDate: date,
        endDate: date,
        startTime: date,
        endTime: date,
        jobId: 1,
      };

      jest.spyOn(scheduleService, "create").mockResolvedValue(schedule);

      const createdSchedule = await scheduleService.create(scheduleInput);

      expect(createdSchedule).toEqual(schedule);
    });
  });

  describe("findOne", () => {
    it("should return a single schedule", async () => {
      const date = new Date();

      const schedule = {
        id: 1,
        startDate: date,
        endDate: date,
        startTime: date,
        endTime: date,
        jobId: 1,
      };

      jest.spyOn(scheduleService, "findOne").mockResolvedValue(schedule);

      const findAllPromise = await scheduleService.findOne({ id: 1 });

      expect(findAllPromise).toEqual(schedule);
    });
  });

  describe("findAll", () => {
    it("should return an array of schedules", async () => {
      const date = new Date();

      const schedules = [
        {
          id: 1,
          startDate: date,
          endDate: date,
          startTime: date,
          endTime: date,
          jobId: 1,
        },
        {
          id: 2,
          startDate: date,
          endDate: date,
          startTime: date,
          endTime: date,
          jobId: 1,
        },
      ];

      jest.spyOn(scheduleService, "findAll").mockResolvedValue(schedules);

      const findAllPromise = await scheduleService.findAll();

      expect(findAllPromise).toEqual(schedules);
    });
  });

  describe("getSchedules", () => {
    it("should return schedule list", async () => {
      const date = new Date();
      const query: GetScheduleQueryDto = {
        startDate: new Date("2023-01-01").toISOString(),
        endDate: new Date("2023-01-31").toISOString(),
        jobType: "TypeA",
        personInChargeId: 1,
      };

      const sampleSchedules: Schedule[] = [
        {
          id: 1,
          startDate: date,
          endDate: date,
          startTime: date,
          endTime: date,
          jobId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          startDate: date,
          endDate: date,
          startTime: date,
          endTime: date,
          jobId: 1,
          createdAt: date,
          updatedAt: date,
        },
      ];

      prisma.schedule.findMany = jest.fn().mockResolvedValue(sampleSchedules);

      const result = await scheduleService.getSchedules(query);

      expect(result).toEqual(sampleSchedules);
    });

    describe("getCalendarEvents", () => {
      it("should return list of calendar events", async () => {
        const sampleSchedules: Schedule[] = [
          {
            id: 1,
            startDate: new Date("2023-09-10T00:00:00.000Z"),
            endDate: new Date("2023-09-11T00:00:00.000Z"),
            startTime: new Date("2023-09-10T09:00:00.000Z"),
            endTime: new Date("2023-09-10T10:00:00.000Z"),
            jobId: 1,
            createdAt: new Date("2023-09-10T00:00:00.000Z"),
            updatedAt: new Date("2023-09-10T00:00:00.000Z"),
          },
          {
            id: 2,
            startDate: new Date("2023-09-12T00:00:00.000Z"),
            endDate: new Date("2023-09-13T00:00:00.000Z"),
            startTime: new Date("2023-09-10T10:00:00.000Z"),
            endTime: new Date("2023-09-10T11:00:00.000Z"),
            jobId: 1,
            createdAt: new Date("2023-09-12T00:00:00.000Z"),
            updatedAt: new Date("2023-09-12T00:00:00.000Z"),
          },
        ];

        const sampleJob = [
          {
            id: 1,
            title: "Sample Job",
          },
        ];

        const query: GetScheduleQueryDto = {
          startDate: new Date("2023-09-10").toISOString(),
          endDate: new Date("2023-09-13").toISOString(),
        };

        scheduleService.getSchedules = jest
          .fn()
          .mockResolvedValue(sampleSchedules);

        prisma.job.findMany = jest.fn().mockResolvedValue(sampleJob);

        const result = await scheduleService.getCalendarEvents(query);

        expect(result.length).toBe(4);
      });
    });
  });
});

import { PrismaService } from "../../database/connection.service";

import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";
import { JobService } from "../job/job.service";
import { GetScheduleQueryDto } from "./dtos/get-schedule.dto";

describe("ScheduleController", () => {
  let scheduleController: ScheduleController;
  let scheduleService: ScheduleService;
  let jobService: JobService;
  let prisma: PrismaService;

  beforeEach(async () => {
    scheduleService = new ScheduleService(prisma);
    scheduleController = new ScheduleController(scheduleService, jobService);
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

      jest
        .spyOn(scheduleController, "checkIfJobExists")
        .mockResolvedValue(true);
      jest.spyOn(scheduleService, "create").mockResolvedValue(schedule);

      const createdSchedule = await scheduleController.create(scheduleInput);

      expect(createdSchedule).toEqual(schedule);
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

      const findAllPromise = await scheduleController.findAll();

      expect(findAllPromise).toEqual(schedules);
    });
  });

  describe("getCalendarEvents", () => {
    const query: GetScheduleQueryDto = {
      startDate: new Date("2023-09-10").toISOString(),
      endDate: new Date("2023-09-13").toISOString(),
    };

    const calendarEvents = [
      {
        jobId: 1,
        scheduleId: 1,
        start: "2023-09-10T09:00:00.496Z",
        end: "2023-09-10T10:00:00.497Z",
        title: "Sample Job",
      },
      {
        jobId: 1,
        scheduleId: 1,
        start: "2023-09-11T09:00:00.498Z",
        end: "2023-09-11T10:00:00.498Z",
        title: "Sample Job",
      },
      {
        jobId: 1,
        scheduleId: 2,
        start: "2023-09-12T10:00:00.519Z",
        end: "2023-09-12T11:00:00.520Z",
        title: "Sample Job",
      },
      {
        jobId: 1,
        scheduleId: 2,
        start: "2023-09-13T10:00:00.522Z",
        end: "2023-09-13T11:00:00.522Z",
        title: "Sample Job",
      },
    ];

    it("should return event list", async () => {
      scheduleService.getCalendarEvents = jest
        .fn()
        .mockResolvedValue(calendarEvents);

      const result = await scheduleController.getCalendarEvents(query);

      expect(result.length).toBe(4);
    });
  });
});

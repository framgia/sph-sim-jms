
import { PrismaService } from '../../database/connection.service';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    scheduleService = new ScheduleService(prisma)
  });

  describe('create', () => {
    it('should return a schedule', async () => {
      const date = new Date();

      const scheduleInput = {
        startDate: "2023-01-02T01:00:00.000Z",
        endDate: "2023-01-02T01:00:00.000Z",
        startTime: "2023-01-02T01:00:00.000Z",
        endTime: "2023-01-02T01:00:00.000Z",
        jobId: 1,
      }

      const schedule = {
        id: 1,
        startDate: date,
        endDate: date,
        startTime: date,
        endTime: date,
        jobId: 1,
      }

      jest.spyOn(scheduleService, 'create').mockResolvedValue(schedule)

      const createdSchedule = await scheduleService.create(scheduleInput)

      expect(createdSchedule).toEqual(schedule);
    })
  })

  describe('findOne', () => {
    it('should return a single schedule', async () => {
      const date = new Date();

      const schedule = {
        id: 1,
        startDate: date,
        endDate: date,
        startTime: date,
        endTime: date,
        jobId: 1,
      }

      jest.spyOn(scheduleService, 'findOne').mockResolvedValue(schedule)

      const findAllPromise = await scheduleService.findOne({ id: 1 })

      expect(findAllPromise).toEqual(schedule);
    })
  })

  describe('findAll', () => {
    it('should return an array of schedules', async () => {
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
        }
      ]

      jest.spyOn(scheduleService, 'findAll').mockResolvedValue(schedules)

      const findAllPromise = await scheduleService.findAll()

      expect(findAllPromise).toEqual(schedules);
    })
  })
});

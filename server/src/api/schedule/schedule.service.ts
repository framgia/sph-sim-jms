import * as moment from "moment";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../database/connection.service";

import { AbstractService } from "../../shared/abstract-service";
import { Schedule } from "@prisma/client";
import { GetScheduleQueryDto } from "./dtos/get-schedule.dto";
import { CalendarEventDto } from "./dtos/calendar-events.dto";

@Injectable()
export class ScheduleService extends AbstractService {
  constructor(prisma: PrismaService) {
    super(prisma, "Schedule");
  }

  async getSchedules({
    startDate,
    endDate,
    jobType,
    personInChargeId,
  }: GetScheduleQueryDto): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      where: {
        OR: !(startDate === undefined && endDate === undefined)
          ? [
              {
                AND: [
                  { startDate: { lte: endDate } }, // Check if schedule starts before or on 'end'
                  { endDate: { gte: startDate } }, // Check if schedule ends after or on 'start'
                ],
              },
              {
                AND: [
                  { startDate: { gte: startDate } }, // Check if schedule starts after or on 'start'
                  { startDate: { lte: endDate } }, // Check if schedule starts before or on 'end'
                ],
              },
            ]
          : undefined,
        job: {
          userId: {
            equals: personInChargeId,
          },
          type: {
            equals: jobType,
            mode: "insensitive",
          },
        },
      },
    });
    return schedules;
  }

  async getCalendarEvents(
    queries: GetScheduleQueryDto,
  ): Promise<CalendarEventDto[]> {
    const schedules = await this.getSchedules(queries);
    const jobIds = schedules.map((x) => x.jobId);
    const jobs = await this.prisma.job.findMany({
      where: {
        id: {
          in: jobIds,
        },
      },
    });

    const calendarEvent: CalendarEventDto[] = [];

    schedules.forEach((schedule) => {
      const startDate = moment(queries.startDate);
      const endDate = moment(queries.endDate);
      const duration = endDate.diff(startDate, "days") + 1;

      for (let i = 0; i <= duration; i++) {
        const targetedDate = moment(startDate).add(i, "day");

        // Extract date components
        const year = targetedDate.year();
        const month = targetedDate.month();
        const day = targetedDate.date();

        // Extract start time components
        const startHours = moment(schedule.startTime).hours();
        const startMinutes = moment(schedule.startTime).minutes();
        const startSeconds = moment(schedule.startTime).seconds();

        // Extract end time components
        const endHours = moment(schedule.endTime).hours();
        const endMinutes = moment(schedule.endTime).minutes();
        const endSeconds = moment(schedule.endTime).seconds();

        if (
          targetedDate.day() >= moment(schedule.startDate).day() &&
          targetedDate.day() <= moment(schedule.endDate).day()
        ) {
          const newCalendarEvent = new CalendarEventDto({
            jobId: schedule.jobId,
            scheduleId: schedule.id,
            start: moment()
              .year(year)
              .month(month)
              .date(day)
              .hours(startHours)
              .minutes(startMinutes)
              .seconds(startSeconds)
              .toISOString(),
            end: moment()
              .year(year)
              .month(month)
              .date(day)
              .hours(endHours)
              .minutes(endMinutes)
              .seconds(endSeconds)
              .toISOString(),
            title: jobs.find((x) => x.id === schedule.jobId)?.title,
          });

          calendarEvent.push(newCalendarEvent);
        }
      }
    });
    return calendarEvent;
  }
}

import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Schedule } from "@prisma/client";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { JobService } from "../job/job.service";
import { ScheduleService } from "./schedule.service";

import { CreateScheduleDto } from "./dtos/create-schedule.dto";
import { GetScheduleQueryDto } from "./dtos/get-schedule.dto";
import { CalendarEventDto } from "./dtos/calendar-events.dto";

@ApiTags("schedule")
@Controller("schedule")
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly jobService: JobService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() params: CreateScheduleDto): Promise<Schedule> {
    const { jobId } = params;

    await this.checkIfJobExists(jobId);

    const schedule = await this.scheduleService.create(params);

    if (!schedule) {
      throw new BadRequestException(
        "Something went wrong. Schedule not created.",
      );
    }

    return schedule;
  }

  async checkIfJobExists(id: number): Promise<boolean> {
    const job = await this.jobService.findOne({ id: Number(id) });

    if (!job) {
      throw new NotFoundException("No job found.");
    }

    return !!job;
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    const schedules = await this.scheduleService.findAll();

    if (schedules.length == 0) {
      throw new NotFoundException("No schedule found.");
    }

    return schedules;
  }

  @Get("/calendar")
  @ApiQuery({
    name: "startDate",
    required: false,
  })
  @ApiQuery({
    name: "endDate",
    required: false,
  })
  @ApiQuery({
    name: "jobType",
    required: false,
  })
  @ApiQuery({
    name: "personInChargeId",
    required: false,
  })
  async getCalendarEvents(
    @Query()
    queries: GetScheduleQueryDto,
  ): Promise<CalendarEventDto[]> {
    const events = await this.scheduleService.getCalendarEvents(queries);

    return events;
  }
}

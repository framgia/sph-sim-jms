import { Job } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { JobService } from "./job.service";

import { CreateJobWithCustomerAndSchedulesDto } from "./dtos/create-job-with-customer-and-schedule.dto";
import { PersonInChargeDto } from "./dtos/person-in-charge.dto";

@ApiTags("job")
@Controller("job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get("types")
  async findAllTypes(): Promise<string[]> {
    const types = await this.jobService.findAllTypes();

    if (types.length === 0) {
      throw new NotFoundException("No job types found.");
    }

    return types;
  }

  @Get("personInCharge")
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllPersonInCharge(): Promise<PersonInChargeDto[]> {
    const person = await this.jobService.findAllPersonInCharge();

    if (person.length === 0) {
      throw new NotFoundException("No person in charge found.");
    }

    return person.map((person) => new PersonInChargeDto({ ...person }));
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() options: CreateJobWithCustomerAndSchedulesDto,
  ): Promise<Job> {
    const job = await this.jobService.createJobWithCustomerAndSchedules(
      options,
    );

    if (!job) {
      throw new BadRequestException("Something went wrong. Job not created.");
    }

    return job;
  }

  @Get()
  async findAll(): Promise<Job[]> {
    const jobs = await this.jobService.findAll();

    if (jobs == 0) {
      throw new NotFoundException("No job found.");
    }
    return jobs;
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Job> {
    const job = await this.jobService.findOne({ id });

    if (!job) {
      throw new NotFoundException("No job found.");
    }

    return job;
  }
}

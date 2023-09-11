import { Module } from "@nestjs/common";

import { PrismaService } from "../../database/connection.service";

import { CustomerService } from "../customer/customer.service";
import { ScheduleService } from "../schedule/schedule.service";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService, CustomerService, ScheduleService],
  exports: [JobService],
})
export class JobModule {}

import { Module } from "@nestjs/common";
import { ScheduleController } from "./schedule.controller";
import { PrismaService } from "src/database/connection.service";
import { ScheduleService } from "./schedule.service";
import { JobModule } from "../job/job.module";

@Module({
  imports: [JobModule],
  controllers: [ScheduleController],
  providers: [PrismaService, ScheduleService],
})
export class ScheduleModule {}

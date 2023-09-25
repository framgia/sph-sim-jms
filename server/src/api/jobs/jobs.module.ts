import { Module } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { JobsService } from "src/services/jobs/jobs.service";
import { PrismaService } from "src/database/connection.service";

@Module({
  controllers: [JobsController],
  providers: [JobsService, PrismaService],
})
export class JobsModule {}

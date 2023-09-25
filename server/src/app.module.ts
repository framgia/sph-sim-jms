import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { JobsModule } from "./api/jobs/jobs.module";
import { JobsService } from "./services/jobs/jobs.service";

@Module({
  imports: [DatabaseModule, JobsModule],
  controllers: [],
  providers: [JobsService],
})
export class AppModule {}

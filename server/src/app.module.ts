import { Module } from '@nestjs/common';
import { JobsModule } from './api/jobs/jobs.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

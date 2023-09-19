import { Module } from '@nestjs/common';
import { JobsModule } from './api/jobs/jobs.module';
import { SearchModule } from './api/search/search.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, JobsModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

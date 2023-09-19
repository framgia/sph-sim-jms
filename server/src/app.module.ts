import { Module } from '@nestjs/common';
import { JobsModule } from './api/jobs/jobs.module';
import { DatabaseModule } from './database/database.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [DatabaseModule, JobsModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

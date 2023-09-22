import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/connection.service';
import { SearchModule } from '../search/search.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [SearchModule],
  controllers: [JobsController],
  providers: [JobsService, PrismaService],
})
export class JobsModule {}

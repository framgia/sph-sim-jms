import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/connection.service';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, PrismaService],
})
export class JobsModule { }

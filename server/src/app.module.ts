import { Module } from '@nestjs/common';

import { JobService } from './api/job/job.service';
import { UserService } from './api/user/user.service';
import { ScheduleService } from './api/schedule/schedule.service';
import { CustomerService } from './api/customer/customer.service';
import { JobController } from './api/job/job.controller';
import { UserController } from './api/user/user.controller';
import { CustomerController } from './api/customer/customer.controller';
import { ScheduleController } from './api/schedule/schedule.controller';
import { JobModule } from './api/job/job.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from './api/schedule/schedule.module';
import { CustomerModule } from './api/customer/customer.module';

@Module({
  imports: [DatabaseModule, CustomerModule, JobModule, ScheduleModule],
  controllers: [UserController, CustomerController, JobController , ScheduleController],
  providers: [UserService, CustomerService, JobService , ScheduleService],
})
export class AppModule {}

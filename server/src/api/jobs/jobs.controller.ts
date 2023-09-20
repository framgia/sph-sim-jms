import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobListDto } from './dto/job-list.dto';
import { JobQueryDto } from './dto/job-query.dto';
import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() jobQuery: JobQueryDto): Promise<JobListDto> {
    const jobs = await this.jobsService.findAll(jobQuery);

    return jobs;
  }
}

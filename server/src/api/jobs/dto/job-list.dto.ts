import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@prisma/client';

export class JobListDto {
  @ApiProperty()
  jobs: Job[];

  @ApiProperty()
  count: number;
}

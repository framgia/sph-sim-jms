import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/connection.service';
import { JobListDto } from './dto/job-list.dto';
import { JobQueryDto } from './dto/job-query.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService){}

  async findAll(query: JobQueryDto): Promise<JobListDto>  {
    try {
      const { page, perPage = 12 } = query;
      const skip = (page - 1) * perPage;

      const [ jobs, count ] = await this.prisma.$transaction([
        this.prisma.job.findMany({
          take: perPage,
          skip,
          include: {
            customer: {
              select: {
                firstName: true,
                lastName: true,
              }
            },
            schedules: {
              select: {
                startDate: true,
                startTime: true,
                endDate: true,
                endTime: true
              }
            },
            estimation: {
              select: {
                status: true,
                totalCost: true,
              }
            },
            personInCharge: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }),
        this.prisma.job.count()
      ]);

      return { jobs, count };
    } catch (err) {
      throw new BadRequestException('Something went wrong.');
    }
  }
}

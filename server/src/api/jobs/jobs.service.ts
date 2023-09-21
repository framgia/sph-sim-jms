import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/connection.service';
import { JobListDto } from './dto/job-list.dto';
import { JobQueryDto } from './dto/job-query.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService){}

  async findAll(query: JobQueryDto): Promise<JobListDto>  {
    try {
      const { page, tag, status, startDate, endDate, perPage = 12 } = query;
      const skip = (page - 1) * perPage;

      const tagCondition = tag ? {
        tags: {
          has: tag
        }
      } : {};

      const statusCondition = status ? {
        estimation: {
          status: {
            equals: status
          }
        }
      } : {};

      let dateRangeCondition = {}
      if (startDate && endDate) {
        const newEndDate = new Date(endDate);
        newEndDate.setDate(newEndDate.getDate() + 1);

        dateRangeCondition = {
          createdAt: {
            lt: newEndDate,
            gte: new Date(startDate),
          }
        };
      }

      const whereCondition = {
        AND: [
          tagCondition,
          statusCondition,
          dateRangeCondition
        ]
      }

      const [ jobs, count ] = await this.prisma.$transaction([
        this.prisma.job.findMany({
          where: whereCondition,
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
        this.prisma.job.count({ where: whereCondition })
      ]);

      return { jobs, count };
    } catch (err) {
      throw new BadRequestException('Something went wrong.');
    }
  }
}

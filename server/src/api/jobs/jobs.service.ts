import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/connection.service';
import { convertToDocuments } from '../../utils/helpers/convertToDocuments';
import { convertToJobs } from '../../utils/helpers/convertToJobs';
import { SearchService } from '../search/search.service';
import { JobListDto } from './dto/job-list.dto';
import { JobQueryDto } from './dto/job-query.dto';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private searchService: SearchService
  ){}

  async findAll(query: JobQueryDto): Promise<JobListDto>  {
    try {
      const data = await this.prisma.job.findMany({
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
      });

      const docs = convertToDocuments(data);

      await this.searchService.addDocuments(docs);
      const results = await this.searchService.searchAndFilter(query);
      
      const jobs = convertToJobs(results);

      return { jobs, count: results.totalHits };
    } catch (err) {
      throw new BadRequestException('Something went wrong.');
    }
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { $Enums } from '@prisma/client';
import { PrismaService } from '../../database/connection.service';
import { SearchService } from '../search/search.service';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let jobService: JobsService;

  const mockPrismaService = {
      job: {
        findMany: jest.fn(),
      },
  };

  const mockSearchService = {
    searchAndFilter: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService, 
        {
          provide: PrismaService,
          useValue: mockPrismaService
        },
        {
          provide: SearchService,
          useValue: mockSearchService
        },
      ],
    }).compile();

    jobService = module.get<JobsService>(JobsService);
  });

  describe('findAll', () => {
    it('should return a list of jobs with the total number of jobs', async () => {
      const jobQuery = { page: 1, perPage: 2, tag: null, status: null, startDate: null, endDate: null, search: null };
      const mockJobList = [
          {
            id: 1,
            title: "Job A",
            type: "Type A",
            tags: [],
            remarks: null,
            customerId: 1,
            paymentMethod: null,
            userId: 1,
            pipelinePhase: null,
            createdAt: new Date("2023-09-07T09:38:42.296Z"),
            updatedAt: new Date("2023-09-07T09:38:42.296Z"),
          },
          {
            id: 2,
            title: "Job B",
            type: "Type B",
            tags: [],
            remarks: null,
            customerId: 2,
            paymentMethod: null,
            userId: 2,
            pipelinePhase: null,
            createdAt: new Date("2023-09-07T09:38:42.296Z"),
            updatedAt: new Date("2023-09-07T09:38:42.296Z"),
          }
        ];
      const mockJobCount = 2;

      const mockFindAll = jest.fn().mockResolvedValue({ jobs: mockJobList, count: mockJobCount });

      jest.spyOn(jobService, 'findAll').mockImplementation(mockFindAll);

      const jobs = await jobService.findAll(jobQuery);

      expect(jobs).toEqual({ jobs: mockJobList, count: mockJobCount });
    });
  });

  describe('filter', () => {
    it('should return a filtered list of jobs with the total number of filtered jobs', async () => {
      const mockTags = [$Enums.Tag.TAG_A];
      const mockStatus = $Enums.Status.APPROVED;
      const jobQuery = { page: 1, perPage: 2, tag: mockTags[0], status: mockStatus, startDate: null, endDate: null, search: null }
      const mockJobList = [
        {
          id: 1,
          title: "Job A",
          type: "Type A",
          tags: mockTags,
          remarks: null,
          customerId: 1,
          paymentMethod: null,
          userId: 1,
          pipelinePhase: null,
          createdAt: new Date("2023-09-07T09:38:42.296Z"),
          updatedAt: new Date("2023-09-07T09:38:42.296Z"),
          estimation: {
            status: mockStatus,
            totalCost: 1000.00
          }
        },
        {
          id: 2,
          title: "Job B",
          type: "Type B",
          tags: [],
          remarks: null,
          customerId: 2,
          paymentMethod: null,
          userId: 2,
          pipelinePhase: null,
          createdAt: new Date("2023-09-07T09:38:42.296Z"),
          updatedAt: new Date("2023-09-07T09:38:42.296Z"),
        }
      ];
      const mockJobCount = 1;

      const mockFindAll = jest.fn().mockResolvedValue({ jobs: mockJobList.slice(0, 1), count: mockJobCount });

      jest.spyOn(jobService, 'findAll').mockImplementation(mockFindAll);

      const jobs = await jobService.findAll(jobQuery);

      expect(jobService.findAll).toHaveBeenCalledWith(jobQuery);
      expect(jobs).toEqual({ jobs: mockJobList.slice(0, 1), count: mockJobCount });
    });
  });

  describe('search', () => {
    it('should return a list of jobs based on the search query', async () => {
      const jobQuery = { page: 1, perPage: 2, tag: null, status: null, startDate: null, endDate: null, search: 'A' }
      const mockJobList = [
        {
          id: 1,
          title: "Job A",
          type: "Type A",
          tags: null,
          remarks: null,
          customerId: 1,
          paymentMethod: null,
          userId: 1,
          pipelinePhase: null,
          createdAt: new Date("2023-09-07T09:38:42.296Z"),
          updatedAt: new Date("2023-09-07T09:38:42.296Z"),
          estimation: {
            status: null,
            totalCost: 1000.00
          }
        },
        {
          id: 2,
          title: "Job B",
          type: "Type B",
          tags: [],
          remarks: null,
          customerId: 2,
          paymentMethod: null,
          userId: 2,
          pipelinePhase: null,
          createdAt: new Date("2023-09-07T09:38:42.296Z"),
          updatedAt: new Date("2023-09-07T09:38:42.296Z"),
        }
      ];
      const mockJobCount = 1;

      const mockFindAll = jest.fn().mockResolvedValue({ jobs: mockJobList.slice(0, 1), count: mockJobCount });

      jest.spyOn(jobService, 'findAll').mockImplementation(mockFindAll);

      const jobs = await jobService.findAll(jobQuery);

      expect(jobService.findAll).toHaveBeenCalledWith(jobQuery);
      expect(jobs).toEqual({ jobs: mockJobList.slice(0, 1), count: mockJobCount });
    });
  });
});

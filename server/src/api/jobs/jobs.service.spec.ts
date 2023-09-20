import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/connection.service';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let jobService: JobsService;

  const mockPrismaService = {
    job: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    jobService = module.get<JobsService>(JobsService);
  });

  describe('findAll', () => {
    it('should be return a list of jobs with the total number of jobs', async () => {
      const jobQuery = { page: 1, perPage: 2 };
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
        },
      ];
      const mockJobCount = 2;

      mockPrismaService.$transaction.mockResolvedValue([
        mockJobList,
        mockJobCount,
      ]);

      const jobs = await jobService.findAll(jobQuery);

      expect(jobs).toEqual({ jobs: mockJobList, count: mockJobCount });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { $Enums } from '@prisma/client';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

describe('JobsController', () => {
  let jobController: JobsController;

  const mockJobService = {
    findAll: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: mockJobService,
        },
      ],
    }).compile();

    jobController = module.get<JobsController>(JobsController);
  });

  describe('findAll', () => {
    it('should return a list of jobs with the total number of jobs', async () => {
      const jobQuery = { page: 1, perPage: 2, tag: null, status: null, startDate: null, endDate: null, search: null };
      const jobList = {
        jobs: [
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
        ],
        count: 2
      };

      jest.spyOn(mockJobService, 'findAll').mockResolvedValue(jobList);

      const jobs = await jobController.findAll(jobQuery);
      
      expect(mockJobService.findAll).toHaveBeenCalledWith(jobQuery);
      expect(jobs).toEqual(jobList);
    });
  });

  describe('filter', () => {
    it('should return a filtered list of jobs with total number of filtered jobs', async () => {
      const mockTags = [$Enums.Tag.TAG_A];
      const mockStatus = $Enums.Status.APPROVED;
      const jobQuery = { page: 1, perPage: 2, tag: mockTags[0], status: mockStatus, startDate: null, endDate: null, search: null };
      
      const jobList = {
        jobs: [
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
        ],
        count: 2
      };

      const filteredJobList = { jobs: jobList.jobs.slice(0, 1), count: 1}

      jest.spyOn(mockJobService, 'findAll').mockResolvedValue(filteredJobList);

      const jobs = await jobController.findAll(jobQuery);
      
      expect(mockJobService.findAll).toHaveBeenCalledWith(jobQuery);
      expect(jobs).toEqual(filteredJobList);
    });
  });
});

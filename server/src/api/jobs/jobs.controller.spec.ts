import { Test, TestingModule } from '@nestjs/testing';
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
      const jobQuery = { page: 1, perPage: 2 };
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
});

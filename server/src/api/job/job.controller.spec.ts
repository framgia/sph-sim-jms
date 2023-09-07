import { $Enums } from '@prisma/client';

import { PrismaService } from '../../database/connection.service';

import { JobService } from './job.service';
import { JobController } from './job.controller';
import { CustomerService } from '../customer/customer.service';

describe('JobController', () => {
  let jobService: JobService;
  let jobController: JobController;
  let customerService: CustomerService
  let prisma: PrismaService

  beforeEach(() => {
    jobService = new JobService(prisma, customerService)
    jobController = new JobController(jobService)
  });

  describe('create', () => {
    it('should return a new job', async () => {
      const jobInput = {
        customer_registration: {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@gmail.com",
          contact: "012345",
          address: "ABC St, DEF Ave, GHI City",
        },
        job_information: {
          title: "string",
          type: "string",
          tags: $Enums.Tag.TAG_A,
          remarks: "string",
          paymentMethod: $Enums.PaymentMethod.CASH,
        },
        work_schedules: []
      }

      const newJob = {
        id: 1,
        title: "string",
        type: "string",
        tags: $Enums.Tag.TAG_A,
        remarks: "string",
        customerId: 1,
        paymentMethod: $Enums.PaymentMethod.CASH,
        userId: 1,
      }

      const mockCreateJobWithCustomerAndSchedules = jest.fn().mockResolvedValue(newJob)
      
      jest.spyOn(jobService, 'createJobWithCustomerAndSchedules').mockImplementation(mockCreateJobWithCustomerAndSchedules)
      
      const createdJob = await jobController.create(jobInput)

      expect(createdJob).toEqual(newJob);
    })
  })

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      const jobs = [{
        id: 1,
        title: "Sample title 1",
        type: "A",
        tags: "TAG_A",
        remarks: "",
        customerId: 1,
        paymentMethod: "CARD",
        userId: 1,
      }, {
        id: 2,
        title: "Sample title 2",
        type: "A",
        tags: "TAG_A",
        remarks: "",
        customerId: 1,
        paymentMethod: "CARD",
        userId: 1,
      }];

      jest.spyOn(jobService, 'findAll').mockResolvedValue(jobs)

      const foundJobs = await jobController.findAll();

      expect(foundJobs).toEqual(jobs);
    })
  })

  describe('findOne', () => {
    it('should return a single job', async () => {
      const job = {
        id: 1,
        title: "Sample title 1",
        type: "A",
        tags: "TAG_A",
        remarks: "",
        customerId: 1,
        paymentMethod: "CARD",
        userId: 1,
      }

      jest.spyOn(jobService, 'findOne').mockResolvedValue(job);

      const foundJob = await jobController.findOne(1);

      expect(foundJob).toEqual(job);
    })
  })
});

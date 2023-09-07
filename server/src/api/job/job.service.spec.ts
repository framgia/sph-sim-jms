import { $Enums } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

import { PrismaService } from '../../database/connection.service';

import { JobService } from './job.service';
import { CustomerService } from '../customer/customer.service';

describe('JobController', () => {
  let jobService: JobService;
  let customerService: CustomerService
  let prisma: PrismaService

  beforeEach(() => {
    jobService = new JobService(prisma, customerService)
  });

  describe('createJobWithCustomerAndSchedules', () => {
    it('should return a new job', async () => {
      const date = new Date();
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
          tags: [$Enums.Tag.TAG_A],
          remarks: "string",
          paymentMethod: $Enums.PaymentMethod.CASH,
        },
        work_schedules: []
      }

      const newJob = {
        id: 1,
        title: "string",
        type: "string",
        tags: [$Enums.Tag.TAG_A],
        remarks: "string",
        customerId: 1,
        paymentMethod: $Enums.PaymentMethod.CASH,
        userId: 1,
        createdAt: date,
        updatedAt: date
      }

      const mockCreateJobWithCustomerAndSchedules = jest.fn().mockResolvedValue(newJob)

      jest.spyOn(jobService, 'createJobWithCustomerAndSchedules').mockImplementation(mockCreateJobWithCustomerAndSchedules)

      const createdJob = await jobService.createJobWithCustomerAndSchedules(jobInput)

      expect(createdJob).toEqual(newJob);
    })
  })

  describe('findOne', () => {
    it('should return a single job', async () => {
      const date = new Date();
      const job = {
        id: 1,
        title: "Sample title 1",
        type: "A",
        tags: [$Enums.Tag.TAG_A],
        remarks: "",
        customerId: 1,
        paymentMethod: $Enums.PaymentMethod.CASH,
        userId: 1,
        createdAt: date,
        updatedAt: date
      }

      jest.spyOn(jobService, 'findOne').mockResolvedValue(job);

      const foundJob = await jobService.findOne(1);

      expect(foundJob).toEqual(job);
    })
  })

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      const date = new Date();
      const jobs = [{
        id: 1,
        title: "Sample title 1",
        type: "A",
        tags: [$Enums.Tag.TAG_A],
        remarks: "",
        customerId: 1,
        paymentMethod: $Enums.PaymentMethod.CASH,
        userId: 1,
        createdAt: date,
        updatedAt: date
      }, {
        id: 2,
        title: "Sample title 2",
        type: "A",
        tags: [$Enums.Tag.TAG_A],
        remarks: "",
        customerId: 1,
        paymentMethod: $Enums.PaymentMethod.CARD,
        userId: 1,
        createdAt: date,
        updatedAt: date
      }];

      jest.spyOn(jobService, 'findAll').mockResolvedValue(jobs)

      const foundJobs = await jobService.findAll();

      expect(foundJobs).toEqual(jobs);
    })
  })

  describe('createJob', () => {
    it('should return a new job', async () => {
      const date = new Date();
      const jobInput = {
        title: "Sample title 1",
        type: "A",
        tags: [$Enums.Tag.TAG_A],
        remarks: "",
        paymentMethod: $Enums.PaymentMethod.CASH,
        customerId: 1,
        userId: 1,
      }

      const newJob = {
        id: 1,
        title: "Sample title 1",
        type: "A",
        tags: [$Enums.Tag.TAG_A],
        remarks: "",
        paymentMethod: $Enums.PaymentMethod.CASH,
        customerId: 1,
        userId: 1,
        createdAt: date,
        updatedAt: date
      }

      jest.spyOn(jobService, 'createJob').mockResolvedValue(newJob)

      const createdJob = await jobService.createJob(jobInput)

      expect(createdJob).toEqual(newJob)
    })
  })

  describe('checkIfJobAlreadyExists', () => {
    it('should return return a job', async () => {
      const customerId = 1;
      const validTitle = 'valid title'

      jest.spyOn(jobService, 'checkIfJobAlreadyExists').mockResolvedValue(true)

      const checkIfJobExists = await jobService.checkIfJobAlreadyExists(validTitle, customerId);

      expect(checkIfJobExists).toEqual(true)
    })
  })

  describe('createSchedules', () => {
    it('should throw BadRequestException if schedules is an empty array', () => {
      const schedules = []

      jest.spyOn(jobService, 'createSchedules').mockRejectedValue(new BadRequestException('Something went wrong. Schedule not created'))

      const createSchedulesPromise = async () => {
        await jobService.createSchedules(schedules, 1)
      }

      expect(createSchedulesPromise).rejects.toThrow(BadRequestException)
    })
  })
});

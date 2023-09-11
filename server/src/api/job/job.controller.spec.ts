import { $Enums } from "@prisma/client";

import { PrismaService } from "../../database/connection.service";

import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { CustomerService } from "../customer/customer.service";
import { Test } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { PersonInChargeDto } from "./dtos/person-in-charge.dto";

describe("JobController", () => {
  let jobService: JobService;
  let jobController: JobController;
  let prisma: PrismaService;

  const mockPrisma = {
    job: {
      groupBy: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        JobService,
        CustomerService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    jobController = moduleRef.get<JobController>(JobController);
    jobService = moduleRef.get<JobService>(JobService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe("create", () => {
    it("should return a new job", async () => {
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
        work_schedules: [],
      };

      const newJob = {
        id: 1,
        title: "string",
        type: "string",
        tags: [$Enums.Tag.TAG_A],
        remarks: "string",
        customerId: 1,
        paymentMethod: $Enums.PaymentMethod.CASH,
        userId: 1,
      };

      const mockCreateJobWithCustomerAndSchedules = jest
        .fn()
        .mockResolvedValue(newJob);

      jest
        .spyOn(jobService, "createJobWithCustomerAndSchedules")
        .mockImplementation(mockCreateJobWithCustomerAndSchedules);

      const createdJob = await jobController.create(jobInput);

      expect(createdJob).toEqual(newJob);
    });
  });

  describe("findAll", () => {
    it("should return an array of jobs", async () => {
      const jobs = [
        {
          id: 1,
          title: "Sample title 1",
          type: "A",
          tags: [$Enums.Tag.TAG_A],
          remarks: "",
          customerId: 1,
          paymentMethod: "CARD",
          userId: 1,
        },
        {
          id: 2,
          title: "Sample title 2",
          type: "A",
          tags: [$Enums.Tag.TAG_A],
          remarks: "",
          customerId: 1,
          paymentMethod: "CARD",
          userId: 1,
        },
      ];

      jest.spyOn(jobService, "findAll").mockResolvedValue(jobs);

      const foundJobs = await jobController.findAll();

      expect(foundJobs).toEqual(jobs);
    });
  });

  describe("findOne", () => {
    it("should return a single job", async () => {
      const job = {
        id: 1,
        title: "Sample title 1",
        type: "A",
        tags: [$Enums.Tag.TAG_A],
        remarks: "",
        customerId: 1,
        paymentMethod: "CARD",
        userId: 1,
      };

      jest.spyOn(jobService, "findOne").mockResolvedValue(job);

      const foundJob = await jobController.findOne(1);

      expect(foundJob).toEqual(job);
    });
  });

  describe("findAllTypes", () => {
    const mockValues = [
      { type: "developer" },
      { type: "writer" },
      { type: "designer" },
    ];

    it("should return string array of types", async () => {
      prisma.job.groupBy = jest.fn().mockResolvedValue(mockValues);

      const expectedReturn = ["developer", "writer", "designer"];
      const returnedTypes = await jobController.findAllTypes();
      expect(returnedTypes).toEqual(expectedReturn);
    });

    it("should throw error", async () => {
      jobService.findAllTypes = jest.fn().mockResolvedValue([]);
      expect(async () => jobController.findAllTypes()).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("findAllPersonInCharge", () => {
    const mockReturnValues = [
      { id: 1, name: "john" },
      { id: 2, name: "doe" },
      { id: 3, name: "jane" },
    ];

    it("should return array of PersonInChargeDto", async () => {
      prisma.user.findMany = jest.fn().mockResolvedValue(mockReturnValues);

      const result = await jobController.findAllPersonInCharge();

      expect(result).toBeInstanceOf(Array<PersonInChargeDto>);
    });

    it("should throw error", async () => {
      jobService.findAllPersonInCharge = jest.fn().mockResolvedValue([]);
      expect(async () => jobController.findAllPersonInCharge()).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

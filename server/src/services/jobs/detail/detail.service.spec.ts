import { DetailService } from "./detail.service";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { JobTypes } from "../../../utils/constants/interfaces";
import { PrismaService } from "../../../database/connection.service";

// Mock PrismaService
const prismaServiceMock = {
  $transaction: jest.fn(),
  job: {
    findUnique: jest.fn(),
  },
};

describe("DetailService", () => {
  let detailService: DetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetailService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    detailService = module.get<DetailService>(DetailService);
  });

  it("should be defined", () => {
    expect(detailService).toBeDefined();
  });

  describe("findOne", () => {
    it("should find a job by ID", async () => {
      const mockJob: JobTypes = {
        id: 1,
        title: "facilis necessitatibus velit",
        type: "maiores",
        tags: ["TAG_B", "TAG_C", "TAG_A"],
        remarks: "test",
        customerId: 1,
        paymentMethod: "CARD",
        userId: 5,
        customer: {
          id: 1,
          firstName: "Precious",
          lastName: "Stehr",
          email: "Lou87@yahoo.com",
          contact: "+63 99 010 30 12",
          address: "21766 Deangelo Fork Apt. 230",
        },
        schedules: [
          {
            id: 10,
            startDate: new Date(),
            endDate: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            jobId: 1,
          },
        ],
        personInCharge: {
          id: 5,
          firstName: "Deborah",
          lastName: "Hagenes-Lemke",
          email: "Shania_Goldner-Hackett93@yahoo.com",
          role: "USER",
        },
      };

      const returnedMockJob = {
        customer_registration: {
          firstName: "Precious",
          lastName: "Stehr",
          contact: "+63 99 010 30 12",
          email: "Lou87@yahoo.com",
          address: "21766 Deangelo Fork Apt. 230",
        },
        job_information: {
          jobTitle: "facilis necessitatibus velit",
          jobType: "maiores",
          personInCharge: {
            id: 5,
            firstName: "Deborah",
          },
          tags: ["TAG_B", "TAG_C", "TAG_A"],
          remarks: "test",
          modeOfPayment: "CARD",
        },
        work_schedule: [
          {
            startDate: new Date().toISOString(),
            startTime: new Date().toISOString(),
            endDate: new Date().toISOString(),
            endTime: new Date().toISOString(),
          },
        ],
      };

      // Mock the behavior of PrismaService
      prismaServiceMock.$transaction.mockImplementation(async (callback) => {
        const result = await callback();
        return result;
      });
      prismaServiceMock.job.findUnique.mockResolvedValue(mockJob);

      const jobId = 1;
      const result = await detailService.findOne(jobId);

      expect(result).toEqual(returnedMockJob);
      expect(prismaServiceMock.job.findUnique).toHaveBeenCalledWith({
        where: { id: jobId },
        include: { customer: true, personInCharge: true, schedules: true },
      });
    });

    it("should throw a NotFoundException when job is not found", async () => {
      const jobId = 1;

      // Mock the behavior of PrismaService to return null
      prismaServiceMock.$transaction.mockImplementation(async (callback) => {
        await callback(); // Simulate no job found
        return null;
      });
      prismaServiceMock.job.findUnique.mockResolvedValue(null);

      try {
        await detailService.findOne(jobId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Job not found");
      }
    });
  });
});

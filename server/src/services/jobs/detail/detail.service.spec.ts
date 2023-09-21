import { DetailService } from "./detail.service";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../../database/connection.service";
import { JobTesting } from "../../../utils/constants/interfaces";
import { Tag } from "../../../utils/constants/enums/TagsEnum";
import { PaymentMethod } from "../../../utils/constants/enums/PaymentMethodEnum";
import { PipelinePhase } from "../../../utils/constants/enums/pipeLinePhase";

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
      const mockJob: JobTesting = {
        id: 1,
        title: "facilis necessitatibus velit",
        type: "maiores",
        tags: [Tag.TAG_A],
        remarks: null,
        customerId: 1,
        paymentMethod: PaymentMethod.CARD,
        userId: 5,
        pipelinePhase: PipelinePhase.NEGOTIATION,
        createdAt: new Date("2023-09-19T02:06:07.655Z"),
        updatedAt: new Date("2023-09-19T02:06:07.655Z"),
        customer: {
          id: 1,
          firstName: "Precious",
          lastName: "Stehr",
          email: "Lou87@yahoo.com",
          contact: "+63 99 010 30 12",
          address: "21766 Deangelo Fork Apt. 230",
          createdAt: new Date("2023-09-19T02:06:07.655Z"),
          updatedAt: new Date("2023-09-19T02:06:07.655Z"),
        },
        personInCharge: {
          id: 5,
          firstName: "Deborahs",
          lastName: "Hagenes-Lemke",
          email: "Shania_Goldner-Hackett93@yahoo.com",
          role: "USER",
          createdAt: new Date("2023-09-19T02:06:07.655Z"),
          updatedAt: new Date("2023-09-19T02:06:07.655Z"),
        },
        schedules: [
          {
            id: 10,
            startDate: new Date("2023-09-19T23:43:52.121Z"),
            endDate: new Date("2023-09-19T17:38:41.290Z"),
            startTime: new Date("2023-09-19T04:05:50.730Z"),
            endTime: new Date("2023-09-19T02:58:45.323Z"),
            jobId: 1,
            createdAt: new Date("2023-09-19T02:06:09.035Z"),
            updatedAt: new Date("2023-09-19T02:06:09.035Z"),
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

      expect(result).toEqual(mockJob);
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

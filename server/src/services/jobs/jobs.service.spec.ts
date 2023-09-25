import { JobsService } from "./jobs.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UpdateJobDto } from "../../api/jobs/dto/update-job.dto";
import { PrismaService } from "../../database/connection.service";
import { PaymentMethod } from "../../utils/constants/enums/paymentMethodEnums";

const mockPrismaService = {
  job: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  customer: {
    update: jest.fn(),
  },
  schedule: {
    update: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe("JobsService", () => {
  let jobsService: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    jobsService = module.get<JobsService>(JobsService);
  });

  it("should be defined", () => {
    expect(jobsService).toBeDefined();
  });

  describe("update", () => {
    it("should update job information", async () => {
      // Mock data
      const id = 1;
      const updateJobDto: UpdateJobDto = {
        customer_registration: {
          firstName: "John",
          lastName: "Cena",
          contact: "1234567890",
          email: "youcantseeme@example.com",
          address: "123 Main St",
        },
        job_information: {
          title: "Fix Plumbing",
          type: "Plumbing",
          tags: ["TAG_A", "TAG_B", "TAG_C"],
          remarks: "Fix leaky faucet",
          customerId: 4,
          paymentMethod: PaymentMethod.CARD,
          userId: 5,
        },
        work_schedule: [
          {
            id: 1,
            startDate: "2024-10-01T00:00:00Z",
            startTime: "2023-09-01T08:32:22.345Z",
            endDate: "2024-09-01T00:00:00Z",
            endTime: "2023-09-01T08:32:22.345Z",
          },
        ],
      };

      // Mock jobs
      mockPrismaService.job.findUnique.mockResolvedValue({ id: 1 });
      mockPrismaService.job.update.mockResolvedValue({ id: 1 });
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return await callback();
      });

      // Call the update method
      const result = await jobsService.update(id, updateJobDto);

      // Assertions
      expect(result).toBe("Updated job information");
      expect(mockPrismaService.job.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.job.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({
          title: "Fix Plumbing",
          type: "Plumbing",
          tags: ["TAG_A", "TAG_B", "TAG_C"],
          remarks: "Fix leaky faucet",
          customerId: 4,
          paymentMethod: PaymentMethod.CARD,
          userId: 5,
        }),
      });
    });

    // it("should throw NotFoundException when job not found", async () => {
    //   // Mock data
    //   const id = 1;
    //   const updateJobDto: UpdateJobDto = {
    //     customer_registration: {
    //       firstName: "",
    //       lastName: "",
    //       contact: "",
    //       email: "",
    //       address: "",
    //     },
    //     job_information: {
    //       customerId: 0,
    //       title: "",
    //       type: "",
    //       userId: 0,
    //       tags: [Tag.TAG_A],
    //       remarks: "",
    //       paymentMethod: PaymentMethod.CARD,
    //     },
    //     work_schedule: [],
    //   };

    //   // Mock jobs
    //   mockPrismaService.job.findUnique.mockResolvedValue(null);

    //   // Assertions
    //   expect(await jobsService.update(id, updateJobDto)).toBe(
    //     "Update error message: Job not found",
    //   );
    //   expect(mockPrismaService.job.findUnique).toHaveBeenCalledWith({
    //     where: { id },
    //   });
    // });
  });
});

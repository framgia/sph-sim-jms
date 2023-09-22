import { NotFoundException } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { UpdateJobDto } from "./dto/update-job.dto";
import { Test, TestingModule } from "@nestjs/testing";
import { JobsService } from "../../services/jobs/jobs.service";
import { Tag } from "../../utils/constants/enums/tagEnums";
import { PrismaService } from "../../database/connection.service";
import { PaymentMethod } from "../../utils/constants/enums/paymentMethodEnums";

describe("JobsController", () => {
  let jobsController: JobsController;
  let jobsService: JobsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [JobsService, PrismaService],
    }).compile();

    jobsController = module.get<JobsController>(JobsController);
    jobsService = module.get<JobsService>(JobsService);
  });
  describe("update", () => {
    it("should update a job and return success message", async () => {
      // Arrange
      const id = 1;
      const successMessage = "Updated job information";
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
          customerId: 19,
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

      // Mock the update method of the jobsService to resolve with success message
      jest.spyOn(jobsService, "update").mockResolvedValue(successMessage);

      // Act
      const result = await jobsController.update(id, updateJobDto);

      // Assert
      expect(result).toEqual(successMessage);
      expect(jobsService.update).toHaveBeenCalledWith(id, updateJobDto);
    });

    it("should handle job not found and throw NotFoundException", async () => {
      // Arrange
      const id = 1;
      const updateJobDto: UpdateJobDto = {
        customer_registration: {
          firstName: "",
          lastName: "",
          contact: "",
          email: "",
          address: "",
        },
        job_information: {
          customerId: 0,
          title: "",
          type: "",
          userId: 0,
          tags: [Tag.TAG_A],
          remarks: "",
          paymentMethod: PaymentMethod.CARD,
        },
        work_schedule: [],
      };
      // Mock the update method to reject with NotFoundException
      jest
        .spyOn(jobsService, "update")
        .mockRejectedValue(new NotFoundException("Job not found"));

      // Act & Assert
      await expect(
        jobsController.update(id, updateJobDto),
      ).rejects.toThrowError(NotFoundException);
      expect(jobsService.update).toHaveBeenCalledWith(id, updateJobDto);
    });
  });
});

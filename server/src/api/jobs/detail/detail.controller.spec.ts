import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { DetailController } from "./detail.controller";
import { ReturnJobType } from "../../../utils/constants/interfaces";
import { PrismaService } from "../../../database/connection.service";
import { DetailService } from "../../../services/jobs/detail/detail.service";
import { Tag } from "../../../utils/constants/enums/TagsEnum";

describe("DetailController", () => {
  let detailController: DetailController;
  let detailService: DetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailController],
      providers: [DetailService, PrismaService],
    }).compile();

    detailController = module.get<DetailController>(DetailController);
    detailService = module.get<DetailService>(DetailService);
  });

  it("should be defined", () => {
    expect(detailController).toBeDefined();
  });

  describe("findOne", () => {
    it("should return a job", async () => {
      const mockJob: ReturnJobType = {
        customer_registration: {
          firstName: "Issac",
          lastName: "Graham",
          contact: "+63 98 107 19 79",
          email: "Drew_Gerhold@hotmail.com",
          address: "7051 Cronin Freeway Apt. 127",
        },
        job_information: {
          jobTitle: "eum architecto nihil",
          jobType: "quia",
          personInCharge: {
            id: 3,
            firstName: "Agustina",
          },
          tags: [Tag.TAG_A],
          remarks: "test",
          modeOfPayment: "CARD",
        },
        work_schedule: [
          {
            startDate: "2023-09-19T09:11:20.170Z",
            startTime: "2023-09-19T03:50:31.408Z",
            endDate: "2023-09-19T11:52:04.686Z",
            endTime: "2023-09-19T13:46:04.377Z",
          },
        ],
      };

      jest.spyOn(detailService, "findOne").mockResolvedValue(mockJob);

      const jobId = "1";
      const result = await detailController.findOne(jobId);

      expect(result).toBe(mockJob);
    });

    it("should throw a NotFoundException when job is not found", async () => {
      jest
        .spyOn(detailService, "findOne")
        .mockRejectedValue(new NotFoundException("Job not found"));

      const jobId = "1";

      try {
        await detailController.findOne(jobId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Job not found");
      }
    });
  });
});

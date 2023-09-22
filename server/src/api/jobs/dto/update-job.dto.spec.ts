import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { UpdateJobDto } from "./update-job.dto";
import { PaymentMethod } from "../../../utils/constants/enums/paymentMethodEnums";

describe("UpdateJobDto", () => {
  describe("Validation", () => {
    it("should validate a valid UpdateJobDto", async () => {
      const validData: UpdateJobDto = {
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

      const dto = plainToClass(UpdateJobDto, validData);
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });

    it("should not validate an invalid CreateJobDto", async () => {
      const invalidData = {
        customer_registration: {
          firstName: "",
          lastNam: "Doe",
          contact: "1234567890",
          email: "john@example.com",
          address: "123 Main St",
        },
        job_information: {
          title: "Software Engineer",
          type: "Full-time",
          personInChargeId: 1,
          tagId: 2,
          paymentMethodId: "2",
        },
        work_schedule: {
          startDate: "2023-09-01",
          startTime: "09:00 AM",
          endDate: "2023-09-01",
          endTime: "05:00 PM",
        },
      };

      const dto = plainToClass(UpdateJobDto, invalidData);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});

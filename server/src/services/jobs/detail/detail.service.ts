import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../database/connection.service";
import { JobTypes, ReturnJobType } from "src/utils/constants/interfaces";
import { ErrorMessage } from "../../../utils/constants/enums/error_message";

@Injectable()
export class DetailService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    try {
      const result = await this.prisma.$transaction(async () => {
        const existingJob = await this.prisma.job.findUnique({
          where: { id },
          include: {
            customer: true,
            schedules: true,
            personInCharge: true,
          },
        });

        if (!existingJob) throw new NotFoundException(ErrorMessage.JobNotFound);

        const mapJobToFormValues = (job: JobTypes): ReturnJobType => ({
          customer_registration: {
            firstName: job.customer.firstName || "",
            lastName: job.customer.lastName || "",
            contact: job.customer.contact || "",
            email: job.customer.email || "",
            address: job.customer.address || "",
          },
          job_information: {
            jobTitle: job.title || "",
            jobType: job.type || "",
            personInCharge: {
              id: job.personInCharge.id || 1,
              firstName: job.personInCharge.firstName || "",
            },
            tags: job.tags || [""],
            remarks: job.remarks || "",
            modeOfPayment: job.paymentMethod || "",
          },
          work_schedule: job.schedules.map((schedule) => ({
            startDate: schedule.startDate.toISOString() || "",
            startTime: schedule.startTime.toISOString() || "",
            endDate: schedule.endDate.toISOString() || "",
            endTime: schedule.endTime.toISOString() || "",
          })),
        });

        return mapJobToFormValues(existingJob);
      });

      return result;
    } catch (err) {
      throw err;
    }
  }
}

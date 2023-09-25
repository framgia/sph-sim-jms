import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateJobDto } from "../../api/jobs/dto/update-job.dto";
import { PrismaService } from "../../database/connection.service";
import { ErrorMessage } from "../../utils/constants/enums/error_message";
import { SuccessMessage } from "../../utils/constants/enums/success_message";

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, updateJobDto: UpdateJobDto): Promise<string> {
    const { customer_registration, job_information, work_schedule } =
      updateJobDto;

    try {
      const result = await this.prisma.$transaction(async () => {
        // Fetch the existing job
        const existingJob = await this.prisma.job.findUnique({
          where: { id },
        });

        if (!existingJob) {
          throw new NotFoundException(ErrorMessage.JobNotFound);
        }

        // Apply updates in parallel
        await Promise.all([
          // Job update
          this.prisma.job.update({
            where: { id },
            data: job_information,
          }),

          // Customer update
          this.prisma.customer.update({
            where: { id: existingJob.customerId },
            data: customer_registration,
          }),

          // Schedule update
          ...work_schedule.map((schedule) =>
            this.prisma.schedule.update({
              where: { id: schedule.id },
              data: schedule,
            }),
          ),
        ]);

        return SuccessMessage.UpdateSuccess;
      });

      return result;
    } catch (err) {
      const errors = err.message.split("\n");
      const lastLineError = errors[errors.length - 1];
      return ErrorMessage.UpdateError + lastLineError;
    }
  }
}

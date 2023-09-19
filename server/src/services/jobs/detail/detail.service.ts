import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../database/connection.service";
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

        return existingJob;
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}

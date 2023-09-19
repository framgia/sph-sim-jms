import { Module } from "@nestjs/common";
import { DetailController } from "./detail.controller";
import { PrismaService } from "src/database/connection.service";
import { DetailService } from "src/services/jobs/detail/detail.service";

@Module({
  controllers: [DetailController],
  providers: [DetailService, PrismaService],
})
export class DetailModule {}

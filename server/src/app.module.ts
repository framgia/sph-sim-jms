import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { DetailModule } from "./api/jobs/detail/detail.module";
import { DetailService } from "./services/jobs/detail/detail.service";

@Module({
  imports: [DatabaseModule, DetailModule],
  controllers: [],
  providers: [DetailService],
})
export class AppModule {}

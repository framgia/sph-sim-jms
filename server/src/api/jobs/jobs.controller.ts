import { UpdateJobDto } from "./dto/update-job.dto";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Body, Patch, Param } from "@nestjs/common";
import { JobsService } from "../../services/jobs/jobs.service";

@Controller("jobs")
@ApiTags("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Patch(":id")
  @ApiCreatedResponse()
  update(@Param("id") id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }
}

import { Controller, Get, Param } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { DetailService } from "../../../services/jobs/detail/detail.service";

@Controller("jobs/detail")
@ApiTags("jobs")
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get(":id")
  @ApiCreatedResponse()
  findOne(@Param("id") id: string) {
    return this.detailService.findOne(+id);
  }
}

import { Transform } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class GetScheduleQueryDto {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  jobType?: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsNumber()
  @IsOptional()
  personInChargeId?: number;
}

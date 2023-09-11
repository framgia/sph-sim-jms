import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CalendarEventDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDateString()
  start: string;

  @ApiProperty()
  @IsDateString()
  end: string;

  @ApiProperty()
  @IsNumber()
  scheduleId: number;

  @ApiProperty()
  @IsNumber()
  jobId: number;

  constructor(event: CalendarEventDto) {
    Object.assign(this, event);
  }
}

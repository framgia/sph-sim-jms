import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class CreateScheduleWithoutJobIdDto {
    @ApiProperty()
    @IsDateString()
    startDate: string;
    
    @ApiProperty()
    @IsDateString()
    endDate: string;

    @ApiProperty()
    @IsDateString()
    startTime: string;

    @ApiProperty()
    @IsDateString()
    endTime: string;

    @ApiProperty()
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional } from "class-validator";

export class CreateScheduleDto {
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
    @IsInt()
    jobId: number
    
    @ApiProperty()
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}

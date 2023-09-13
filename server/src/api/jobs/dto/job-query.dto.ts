import { ApiProperty } from '@nestjs/swagger';
import { Status, Tag } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { IsDateRange } from '../../../utils/validators/dateRange.validator';

export class JobQueryDto {
    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    page: number;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    perPage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(Tag)
    tag: Tag;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(Status)
    status: Status;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateRange()
    startDate: Date;
    
    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateRange()
    endDate: Date;
}

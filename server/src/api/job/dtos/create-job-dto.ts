import { $Enums, PaymentMethod, Tag } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";

export class CreateJobDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    @IsIn(Object.values(Tag))
    tags: $Enums.Tag;

    @ApiProperty()
    @IsOptional()
    @IsString()
    remarks: string;

    @ApiProperty()
    @IsString()
    @IsIn(Object.values(PaymentMethod))
    paymentMethod: $Enums.PaymentMethod;

    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNumber()
    customerId: number;
    
    @ApiProperty()
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}

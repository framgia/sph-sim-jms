import { PaymentMethod, Tag } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsEnum,
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
    @IsArray()
    @IsEnum(Tag, { each: true })
    tags: Tag[]

    @ApiProperty()
    @IsOptional()
    @IsString()
    remarks: string;

    @ApiProperty()
    @IsString()
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

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

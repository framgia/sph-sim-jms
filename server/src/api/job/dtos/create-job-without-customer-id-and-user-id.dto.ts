import { ApiProperty } from "@nestjs/swagger";
import { Tag, PaymentMethod } from "@prisma/client";
import { IsString, IsOptional, IsEnum, IsArray, IsNumber } from "class-validator";

export class CreateJobWithoutCustomerIdDto {
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
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    remarks: string;

    @ApiProperty()
    @IsString()
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @ApiProperty()
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}

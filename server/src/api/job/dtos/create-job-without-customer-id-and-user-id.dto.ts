import { ApiProperty } from "@nestjs/swagger";
import { Tag, PaymentMethod } from "@prisma/client";
import { IsString, IsOptional, IsEnum, IsArray } from "class-validator";

export class CreateJobWithoutCustomerIdAndUserIdDto {
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
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { Tag, $Enums, PaymentMethod } from "@prisma/client";
import { IsString, IsIn, IsOptional } from "class-validator";

export class CreateJobWithoutCustomerIdAndUserIdDto {
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
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}

import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsEnum,
  IsEmail,
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsMobilePhone,
} from "class-validator";
import {
  JobInfoDetails,
  CustomerInfoDetails,
  WorkscheduleInfoDetails,
} from "../../../utils/constants/apiPropertyValues";
import { Type } from "class-transformer";
import { PaymentMethod } from "../../../utils/constants/enums/paymentMethodEnums";
import { Tag } from "@prisma/client";

export class CustomerRegistration {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  contact: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export class JobInformation {
  @IsNotEmpty()
  @IsInt()
  customerId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({ enum: Tag })
  @IsArray()
  @IsEnum(Tag, { each: true })
  readonly tags: Tag[];

  @IsOptional()
  @IsString()
  remarks: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  readonly paymentMethod: PaymentMethod;
}

export class WorkSchedule {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;
}
[];

export class UpdateJobDto {
  @ApiProperty({
    example: CustomerInfoDetails,
  })
  @ValidateNested()
  @Type(() => CustomerRegistration)
  customer_registration: CustomerRegistration;

  @ApiProperty({
    example: JobInfoDetails,
  })
  @ValidateNested()
  @Type(() => JobInformation)
  job_information: JobInformation;

  @ApiProperty({
    example: WorkscheduleInfoDetails,
  })
  @ValidateNested()
  @Type(() => WorkSchedule)
  work_schedule: WorkSchedule[];
}

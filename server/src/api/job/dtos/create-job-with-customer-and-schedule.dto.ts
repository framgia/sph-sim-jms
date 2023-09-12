import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";

import { CreateCustomerDto } from "../../customer/dtos/create-customer.dto";
import { CreateJobWithoutCustomerIdDto } from "./create-job-without-customer-id-and-user-id.dto";
import { CreateScheduleWithoutJobIdDto } from "../../schedule/dtos/create-schedule-without-job-id.dto";

export class CreateJobWithCustomerAndSchedulesDto {
    @ApiProperty()
    @Type(() => CreateCustomerDto)
    @ValidateNested()
    customer_registration: CreateCustomerDto

    @ApiProperty()
    @Type(() => CreateJobWithoutCustomerIdDto)
    @ValidateNested()
    job_information: CreateJobWithoutCustomerIdDto
    
    @ApiProperty()
    @Type(() => CreateScheduleWithoutJobIdDto)
    @ValidateNested()
    work_schedules: CreateScheduleWithoutJobIdDto[]
}

import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";

import { CreateCustomerDto } from "../../customer/dtos/create-customer.dto";
import { CreateJobWithoutCustomerIdAndUserIdDto } from "./create-job-without-customer-id-and-user-id.dto";
import { CreateScheduleWithoutJobIdDto } from "../../schedule/dtos/create-schedule-without-job-id.dto";

export class CreateJobWithCustomerAndSchedulesDto {
    @ApiProperty()
    @Type(() => CreateCustomerDto)
    @ValidateNested()
    customer_registration: CreateCustomerDto

    @ApiProperty()
    @Type(() => CreateJobWithoutCustomerIdAndUserIdDto)
    @ValidateNested()
    job_information: CreateJobWithoutCustomerIdAndUserIdDto
    
    @ApiProperty()
    @Type(() => CreateScheduleWithoutJobIdDto)
    @ValidateNested()
    work_schedules: CreateScheduleWithoutJobIdDto[]
}

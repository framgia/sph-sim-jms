import { Customer, Job } from '@prisma/client';
import { UsePipes, ValidationPipe, BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/connection.service';

import { AbstractService } from '../../shared/abstract-service';
import { CustomerService } from '../customer/customer.service';
import { CreateJobDto } from './dtos/create-job-dto';
import { CreateCustomerDto } from '../customer/dtos/create-customer.dto';
import { CreateJobWithCustomerAndSchedulesDto } from './dtos/create-job-with-customer-and-schedule.dto';
import { CreateScheduleWithoutJobIdDto } from '../schedule/dtos/create-schedule-without-job-id.dto';

@Injectable()
@UsePipes(new ValidationPipe())
export class JobService extends AbstractService {
    constructor(
        prisma: PrismaService,
        private readonly customerService: CustomerService,
    ) {
        super(prisma, "Job")
    }

    async createJobWithCustomerAndSchedules(createJobWithCustomerAndSchedulesOptions: CreateJobWithCustomerAndSchedulesDto): Promise<Job> {
        const {
            customer_registration,
            job_information,
            work_schedules
        } = createJobWithCustomerAndSchedulesOptions;

        const transaction = await this.prisma.$transaction(async () => {

            // Step 1: Create the customer
            const customerInput = { ...customer_registration }
            const customer = await this.createCustomer(customerInput)

            // Step 2: Create the job associated with the customer
            // TODO: Update userId to be authUserId
            const jobInput = { ...job_information, customerId: customer.id, userId: 1 } 
            const job = await this.createJob(jobInput)

            // Step 3: Create schedules for the job
            await this.createSchedules(work_schedules, job.id)

            return job
        })

        return transaction;
    }

    async createJob(options: CreateJobDto): Promise<Job> {
        const { title, customerId } = options
        await this.checkIfJobAlreadyExists(title, customerId)

        const newJob = await this.prisma.job.create({
            data: options
        })

        if (!newJob) {
            throw new BadRequestException('Something went wrong. job not created.')
        }

        return newJob
    }

    async checkIfJobAlreadyExists(title: string, customerId: number): Promise<boolean> {
        const jobAlreadyExists = await this.prisma.job.findFirst({
            where: {
                title,
                customerId,
            },
        });

        if (jobAlreadyExists) {
            throw new BadRequestException('Job with the same title and customer already exists.');
        }

        return !!jobAlreadyExists
    }

    async createCustomer(options: CreateCustomerDto): Promise<Customer> {
        const { email } = options
        const existingCustomer = await this.checkIfCustomerAlreadyExists(email)

        if (existingCustomer) {
            return existingCustomer
        }

        const newCustomer = await this.customerService.create(options)

        if (!newCustomer) {
            throw new BadRequestException('Something went wrong. Customer not created.')
        }

        return newCustomer
    }

    async checkIfCustomerAlreadyExists(email: string) {
        return await this.customerService.findOne({ email })
    }

    async createSchedules(schedulesData: CreateScheduleWithoutJobIdDto[], jobId: number): Promise<void> {
        if (schedulesData.length == 0) {
            throw new BadRequestException('Something went wrong. Schedule not created.')
        }

        const schedulesDataWithJobId = schedulesData.map((schedule) => ({
            ...schedule,
            jobId,
        }));

        await this.prisma.schedule.createMany({
            data: schedulesDataWithJobId
        })
    }
}

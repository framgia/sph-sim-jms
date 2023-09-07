import { Customer } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CustomerService } from './customer.service';

import { CreateCustomerDto } from './dtos/create-customer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) { }

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() options: CreateCustomerDto): Promise<Customer> {
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

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
        const customer = await this.customerService.findOne({ id })

        if (!customer) {
            throw new NotFoundException("No customer found.")
        }

        return customer
    }

    @Get()
    async findAll(): Promise<Customer[]> {
        const customers = await this.customerService.findAll()

        if (customers.length == 0) {
            throw new NotFoundException('No customer found.')
        }

        return customers
    }
}

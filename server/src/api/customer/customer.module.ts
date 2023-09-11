import { Module } from '@nestjs/common';

import { PrismaService } from '../../database/connection.service';

import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  providers: [CustomerService, PrismaService],
  controllers: [CustomerController],
  exports: []
})
export class CustomerModule {}

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/connection.service';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;
  let prisma: PrismaService
  
  beforeEach(() => {
    customerService = new CustomerService(prisma);
    customerController = new CustomerController(customerService);
  });

  describe('create', () => {
    it('should return a customer', async () => {
      const newCustomer = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        contact: "0123456",
        address: "ABC St, DEF Ave, GHI City"
      }

      jest.spyOn(customerService, 'create').mockResolvedValue(newCustomer)
      jest.spyOn(customerController, 'checkIfCustomerAlreadyExists').mockResolvedValue(false)

      const createdCustomer = await customerController.create(newCustomer);

      expect(createdCustomer).toEqual(newCustomer);
    })

    it('should return BadRequestException if input is invalid', async () => {
      const invalidInput = {
        firstName: "",
        lastName: "",
        email: "invalidEmail",
        contact: "012345",
        address: "ABC City"
      }

      jest.spyOn(customerController, 'checkIfCustomerAlreadyExists').mockResolvedValue(false)
      jest.spyOn(customerService, 'create').mockRejectedValue(new BadRequestException('error'))

      const createCustomerPromise = async  () => {
        await customerController.create(invalidInput);
      }

      expect(createCustomerPromise).rejects.toThrow(BadRequestException);
    })
  })

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const customer = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        contact: "0123456",
        address: "ABC St, DEF Ave, GHI City"
      }

      jest.spyOn(customerService, 'findOne').mockResolvedValue(customer);

      const foundCustomer = await customerController.findOne(1);

      expect(foundCustomer).toEqual(customer);
    })

    it('should throw a not found exception when no customer is found', async () => {
      jest.spyOn(customerService, 'findOne').mockRejectedValue(new NotFoundException('No customer found.'));

      const invalidId = 99;

      const findOnePromise = customerController.findOne(invalidId);

      await expect(findOnePromise).rejects.toThrow('No customer found.');
    })
  })

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const customers = [{
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        contact: "0123456",
        address: "ABC St, DEF Ave, GHI City"
      }, {
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        contact: "4567890",
        address: "DEF St, GHI Ave, ABC City"
      }];

      jest.spyOn(customerService, 'findAll').mockResolvedValue(customers)

      const foundCustomers = await customerController.findAll();

      expect(foundCustomers).toEqual(customers);
    })

    it('should throw a not found exception when no customer is found', async () => {
      jest.spyOn(customerService, 'findAll').mockRejectedValue(new NotFoundException('No customer found.'));

      const findAllPromise = customerController.findAll();

      await expect(findAllPromise).rejects.toThrow('No customer found.');
    })
  })
});

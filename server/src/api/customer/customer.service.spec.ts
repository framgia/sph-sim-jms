import { PrismaService } from '../../database/connection.service';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let prisma: PrismaService

  beforeEach(async () => {
    customerService = new CustomerService(prisma);
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

      const createdCustomer = await customerService.create(newCustomer);

      expect(createdCustomer).toEqual(newCustomer);
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

      const foundCustomer = await customerService.findOne(1);

      expect(foundCustomer).toEqual(customer);
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

      const foundCustomers = await customerService.findAll();

      expect(foundCustomers).toEqual(customers);
    })
  })
});

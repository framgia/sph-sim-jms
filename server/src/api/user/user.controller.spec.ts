import { PrismaService } from '../../database/connection.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService
  let prisma: PrismaService

  beforeEach(async () => {
    userService = new UserService(prisma)
    userController = new UserController(userService)
  });

  describe('create', () => {
    it('should return a user', async () => {
      const newUser = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        role: "USER"
      }

      jest.spyOn(userService, 'create').mockResolvedValue(newUser)

      const createdUser = await userController.create(newUser);

      expect(createdUser).toEqual(newUser);
    })

    it('should throw a bad request exception when input is invalid', async () => {
      const invalidInput = {
        firstName: "",
        lastName: "",
        email: "invalid",
        role: "invalid"
      }

      jest.spyOn(userService, 'create').mockRejectedValue(new BadRequestException('Someting went wrong. Customer not created.'));

      const createPromise  = userController.create(invalidInput)

      await expect(createPromise).rejects.toThrow('Someting went wrong. Customer not created.');
    })
  })

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        role: "USER"
      }

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const foundUser = await userController.findOne(1);

      expect(foundUser).toEqual(user);
    })

    it('should throw a not found exception when there is no user found', async () => {
      jest.spyOn(userService, 'findOne').mockRejectedValue(new NotFoundException('No customer found.'));

      const invalidId = 99;

      const findOnePromise = userController.findOne(invalidId);

      await expect(findOnePromise).rejects.toThrow('No customer found.');
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{
        firstName: "John",
        lastName: "Doe",
        role: "USER"
      }, {
        firstName: "Jane",
        lastName: "Doe",
        role: "ADMIN"
      }];

      jest.spyOn(userService, 'findAll').mockResolvedValue(users)

      const foundUsers = await userController.findAll();

      expect(foundUsers).toEqual(users);
    })

    it('should throw a not found exception when there is no user found', async () => {
      jest.spyOn(userService, 'findAll').mockRejectedValue(new NotFoundException('No customer found.'));

      const findAllPromise = userController.findAll();

      await expect(findAllPromise).rejects.toThrow('No customer found.');
    })
  })
});

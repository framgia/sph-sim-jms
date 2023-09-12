import { PrismaService } from '../../database/connection.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService
  let prisma: PrismaService

  beforeEach(async () => {
    userService = new UserService(prisma)
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

      const createdUser = await userService.create(newUser);

      expect(createdUser).toEqual(newUser);
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

      const foundUser = await userService.findOne(1);

      expect(foundUser).toEqual(user);
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

      const foundUsers = await userService.findAll();

      expect(foundUsers).toEqual(users);
    })
  })
});

import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/connection.service';

import { AbstractService } from '../../shared/abstract-service';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [PrismaService, UserService, AbstractService]
})
export class UserModule {}

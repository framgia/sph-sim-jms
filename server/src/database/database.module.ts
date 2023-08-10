import { Module } from '@nestjs/common';
import { PrismaService } from './connection.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}

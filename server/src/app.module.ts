import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SampleController } from './api/sample/sample.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SampleController],
  providers: [],
})
export class AppModule {}

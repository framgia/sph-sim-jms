import { Controller, Get } from '@nestjs/common';

@Controller()
export class SampleController {
  @Get()
  getHello(): string {
    return '(SERVER) Hello World!';
  }
}

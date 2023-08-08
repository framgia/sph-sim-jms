import { IsString } from 'class-validator';

export class SampleUserDTO {
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;
}

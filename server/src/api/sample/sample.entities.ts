import { SampleUser } from '@prisma/client';

export class SampleUserEntity implements SampleUser {
  id: number;
  name: string;
  email: string;
}

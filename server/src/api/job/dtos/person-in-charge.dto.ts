import { OmitType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserDto } from "../../user/dtos/user.dto";
import { Exclude, Expose } from "class-transformer";

export class PersonInChargeDto extends OmitType(UserDto, [
  "createdAt",
  "updatedAt",
]) {
  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Expose()
  @IsString()
  get fullname(): string | undefined {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<PersonInChargeDto>) {
    super();
    Object.assign(this, partial);
  }
}

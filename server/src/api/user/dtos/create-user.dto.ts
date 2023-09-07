import { Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsIn(Object.values(Role))
    role: string;

    @ApiProperty()
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}

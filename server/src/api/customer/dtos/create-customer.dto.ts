import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
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
    @IsString()
    contact: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsOptional()
    createdAt?: string;

    @ApiProperty()
    @IsOptional()
    updatedAt?: string;
}

import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Get, NotFoundException, Post, UsePipes, ValidationPipe, ParseIntPipe, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() params: CreateUserDto): Promise<string> {
        const user = await this.userService.create(params)

        if (!user) {
            throw new BadRequestException('Something went wrong. User not created.')
        }

        return user
    }

    @Get('/:id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.findOne({ id })

        if (!user) {
            throw new NotFoundException('No user found.')
        }

        return user
    }

    @Get()
    async findAll(): Promise<User[]> {
        const users = await this.userService.findAll()

        if (users.length == 0) {
            throw new NotFoundException('No user found.')
        }

        return users
    }
}

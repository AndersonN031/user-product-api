import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { deleteIdDto, FindAllParameters, UpdateDto, UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteIdDto } from './dto/delete-id.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Param() params: FindAllParameters): Promise<UserDto[]> {
        return this.userService.findAll(params)
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findById(@Param('id') id: string): Promise<UserDto> {
        return this.userService.findById(id)
    }


    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return this.userService.create(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
        return this.userService.update(id, updateDto);
    }

    @UseGuards(AuthGuard)
    @Delete('/:adminId')
    @HttpCode(HttpStatus.OK)
    remove(@Param('adminId') adminId: string, @Body() deleteIdDto: DeleteIdDto): Promise<UserDto> {
        return this.userService.delete(adminId, deleteIdDto)
    }
}

import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEnum(['USER', 'ADMIN'])

    @IsOptional()
    role?: 'USER' | 'ADMIN';
}

export class UpdateUserDto {
    @IsString()
    username: string;
}
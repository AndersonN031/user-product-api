import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/create-user.dto';
import { hash as bcryptHash } from 'bcrypt'
import { FindAllParameters, UpdateDto, UserDto } from './dto/user.dto';
import { DeleteIdDto } from './dto/delete-id.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async findAll(params: FindAllParameters): Promise<UserDto[]> {
        const users = await this.prisma.user.findMany({
            where: {
                id: params.id,
                email: params.email,
                username: params.username,
                role: params.role,
                createdAt: params.createdAt,
                updatedAt: params.updatedAt
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return users;

    }

    async findById(id: string): Promise<UserDto> {
        const foundUser = await this.prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!foundUser) throw new HttpException(`Usuário com id ${id} não foi encontrada`, HttpStatus.NOT_FOUND)

        return foundUser;
    }

    async findByUserEmail(email: string): Promise<UserDto | null> {
        const userFound = await this.prisma.user.findFirst({
            where: { email }
        })

        if (!userFound) return null;

        return userFound;
    }

    async create(newUser: CreateUserDto) {
        const passwordHash = await bcryptHash(newUser.password, 10);
        const createdUser = await this.prisma.user.create({
            data: {
                email: newUser.email,
                username: newUser.username,
                password: passwordHash,
                role: newUser.role || 'USER'
            }
        })

        return {
            id: createdUser.id,
            email: createdUser.email,
            username: createdUser.username,
            password: createdUser.password,
            role: createdUser.role,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }
    }

    async update(id: string, params: UpdateDto): Promise<UpdateDto> {
        const foundUser = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!foundUser) throw new HttpException(`Usuário com id ${id} não foi encontrada`, HttpStatus.NOT_FOUND)

        const updateUser = await this.prisma.user.update({
            where: { id: id },
            data: {

                username: params.username,

            }, select: { username: true }
        })

        return updateUser;
    }

    async delete(adminId: string, params: DeleteIdDto): Promise<UserDto> {

        const adminUser = await this.prisma.user.findUnique({
            where: {
                id: adminId,
            }
        });

        if (!adminUser) {
            throw new HttpException(`Administrador com id ${adminId} não foi encontrado`, HttpStatus.NOT_FOUND);
        }

        if (adminUser.role !== "ADMIN") {
            throw new HttpException(`Apenas administradores podem excluir outros usuários`, HttpStatus.FORBIDDEN);
        }

        const userToDelete = await this.prisma.user.findUnique({
            where: {
                id: params.id,
            },
        })

        if (!userToDelete) {
            throw new HttpException(`Usuário com id ${params.id} não foi encontrado`, HttpStatus.NOT_FOUND);
        }

        const deletedUser = await this.prisma.user.delete({
            where: {
                id: params.id,
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return deletedUser;


    }

}

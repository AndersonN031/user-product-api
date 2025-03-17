import { Role } from "@prisma/client";

export class UserDto {
    id: string;
    email: string;
    username: string;
    password?: string;
    role: 'USER' | 'ADMIN';
    createdAt: Date;
    updatedAt: Date;
}

export class UpdateDto {
    username: string;
}

export class deleteIdDto {
    id: string;
}

export interface FindAllParameters {
    id: string;
    email: string;
    username: string
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
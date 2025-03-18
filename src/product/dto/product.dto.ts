import { UserDto } from "src/users/dto/user.dto";

export class ProductDto {
    id: string;
    name: string;
    price: number;
    description: string | null
    category: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UpdateProductDto {
    name: string;
    price: number;
    description: string
    category: string;
}

export interface FindAllParameters {
    id: string;
    name: string;
    price: number;
    userId: string;
    user?: UserDto;
    createdAt: Date;
    updatedAt: Date;
}

export enum ProductCategory {
    ELETRONICOS = "ELETRONICOS",
    ACESSORIOS = "ACESSORIOS",
    PERIFERICOS = "PERIFERICOS",
    MOVEIS = "MOVEIS",
    AUDIO = "AUDIO",
    UNCATEGORIZED = "UNCATEGORIZED"
}
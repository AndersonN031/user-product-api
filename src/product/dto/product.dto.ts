//product.dto.ts

import { UserDto } from "src/users/dto/user.dto";

export class ProductDto {
    id: string;
    name: string;
    price: number;
    description: string | null
    category: string;
    quantity: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
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


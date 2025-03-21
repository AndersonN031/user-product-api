import { IsEnum, IsNumber, IsString } from "class-validator";
import { Category } from "@prisma/client";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsEnum(Category)
    category: string;

    @IsNumber()
    quantity: number;

}


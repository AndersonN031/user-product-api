import { Category } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
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
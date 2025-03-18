import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { FindAllParameters, ProductCategory, ProductDto } from './dto/product.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UserWithProductsDto } from './dto/user-with-products.dto';
import { Category } from '@prisma/client';


@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async showProduct(
        userId: string,
        productName?: string,
        orderByPrice?: 'asc' | 'desc',
        productCategory?: ProductCategory
    ): Promise<UserWithProductsDto> {
        const foundUser = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                products: {
                    where: {
                        AND: [
                            productName ? { name: { contains: productName, mode: "insensitive" } } : {},
                            productCategory ? { category: { equals: productCategory } } : {}
                        ]
                    },
                    orderBy: orderByPrice ? { price: orderByPrice } : undefined,
                },
            }
        });

        const userDto: UserDto = {
            id: foundUser!.id,
            email: foundUser!.email,
            username: foundUser!.username,
            role: foundUser!.role,
            createdAt: foundUser!.createdAt,
            updatedAt: foundUser!.updatedAt,
        };

        const productsDto: ProductDto[] = foundUser!.products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            userId: product.userId,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));


        return {
            user: userDto,
            products: productsDto,
        };
    }

    async create(userId: string, newProduct: CreateProductDto) {
        const foundUser = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                products: true
            }
        })

        if (!foundUser) {
            throw new HttpException(`O usuário não foi encontrado`, HttpStatus.NOT_FOUND);
        }

        const createProduct = await this.prisma.product.create({
            data: {
                name: newProduct.name,
                price: newProduct.price,
                user: { connect: { id: userId } }
            }
        })

        return createProduct;
    }

    async update(userId: string, productId: string, params: UpdateProductDto): Promise<{ message: string; updatedProduct: ProductDto }> {
        const foundUser = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        if (!foundUser) {
            throw new HttpException(`O usuário não foi encontrado`, HttpStatus.NOT_FOUND);
        }

        const foundProduct = await this.prisma.product.findUnique({
            where: { id: productId }
        });

        if (!foundProduct || foundProduct.userId !== userId) {
            throw new HttpException(`Produto não encontrado ou não pertence ao usuário`, HttpStatus.NOT_FOUND);
        }

        const updatedProduct = await this.prisma.product.update({
            where: { id: productId },
            data: {
                name: params.name,
                price: params.price,
                description: params.description,
                category: params.category as Category
            }
        })

        return {
            message: "Produto atualizado com sucesso!",
            updatedProduct
        }
    }

    async delete(userId: string, productId: string): Promise<{ message: string; deletedProduct: ProductDto }> {
        const foundUser = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        if (!foundUser) {
            throw new HttpException(`O usuário não foi encontrado`, HttpStatus.NOT_FOUND);
        }

        const foundProduct = await this.prisma.product.findUnique({
            where: { id: productId }
        });

        if (!foundProduct || foundProduct.userId !== userId) {
            throw new HttpException(`Produto não encontrado ou não pertence ao usuário`, HttpStatus.NOT_FOUND);
        }

        const deletedProduct = await this.prisma.product.delete({
            where: { id: productId }
        })

        return {
            message: "Produto deletado com sucesso!",
            deletedProduct
        };

    }
}

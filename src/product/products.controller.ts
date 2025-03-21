import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { UserWithProductsDto } from './dto/user-with-products.dto';
import { ProductCategory } from './dto/product-category.enum';
import { UpdateProductDto } from './dto/update-product-validator.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private readonly productsServices: ProductService) { }

    @Get('/:userId')
    async showProduct(
        @Param('userId') userId: string,
        @Query('productName') productName?: string,
        @Query('orderByPrice') orderByPrice?: 'asc' | 'desc',
        @Query('productCategory') productCategory?: ProductCategory
    ): Promise<UserWithProductsDto> {
        return await this.productsServices.showProduct(userId, productName, orderByPrice, productCategory);
    }

    @Post('/:userId')
    async create(@Param('userId') userId: string, @Body() createProductDto: CreateProductDto): Promise<ProductDto> {
        return await this.productsServices.create(userId, createProductDto);
    }

    @Put('/:userId')
    async update(
        @Param('userId') userId: string,
        @Body('productId') productId: string,
        @Body() updatedDto: UpdateProductDto,
    ): Promise<{ message: string; updatedProduct: ProductDto }> {
        return await this.productsServices.update(userId, productId, updatedDto)
    }

    @Delete('/:userId')
    async delete(
        @Param('userId') userId: string,
        @Body('productId') productId: string
    ): Promise<{ message: string; deletedProduct: ProductDto }> {
        return await this.productsServices.delete(userId, productId)
    }
}

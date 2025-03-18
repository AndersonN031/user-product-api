// dto/user-with-products.dto.ts

import { UserDto } from 'src/users/dto/user.dto';
import { ProductDto } from './product.dto';

export class UserWithProductsDto {
    user: UserDto;
    products: ProductDto[];
}
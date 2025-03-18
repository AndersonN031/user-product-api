import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductService } from './product/products.service';
import { ProductModule } from './product/products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule, UsersModule, AuthModule, ProductModule, PrismaModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, ProductService],
})
export class AppModule { }

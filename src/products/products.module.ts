import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Categories } from './entities/categories.entity';
import { Accounts } from 'src/accounts/entities/account.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '30d' }
    }),
     TypeOrmModule.forFeature([Products, Categories, Accounts])],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoriesService, jwtStrategy],
})
export class ProductsModule { }

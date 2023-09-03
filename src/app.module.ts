import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { FactorsModule } from './factors/factors.module';
import { ProductsModule } from './products/products.module';
import { Accounts } from './accounts/entities/account.entity';
import { Factors } from './factors/entities/factors.entity';
import { Factor_items } from './factors/entities/factor_item.entity';
import { Categories } from './products/entities/categories.entity';
import { Products } from './products/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'dastak',
      entities: [Accounts, Factors, Factor_items, Categories, Products],
      synchronize: true
    }),
    AccountsModule,
    FactorsModule,
    ProductsModule,
  ]
})
export class AppModule { }

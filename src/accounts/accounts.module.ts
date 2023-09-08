import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { Products } from 'src/products/entities/products.entity';
import { Categories } from 'src/products/entities/categories.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts, Products, Categories]), HttpModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}

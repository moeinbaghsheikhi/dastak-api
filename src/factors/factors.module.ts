import { Module } from '@nestjs/common';
import { FactorsService } from './factors.service';
import { FactorsController } from './factors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factors } from './entities/factors.entity';
import { Factor_items } from './entities/factor_item.entity';
import { Accounts } from 'src/accounts/entities/account.entity';
import { FactorsItemController } from './factors_item.controller';
import { FactorsItemService } from './factors_item.service';
import { Products } from 'src/products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factors, Factor_items, Accounts, Products])],
  controllers: [FactorsController, FactorsItemController],
  providers: [FactorsService, FactorsItemService],
})
export class FactorsModule { }

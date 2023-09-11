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
import { jwtStrategy } from 'src/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret' ,
      signOptions: { expiresIn: '30d' }

    }),
    TypeOrmModule.forFeature([Factors, Factor_items, Accounts, Products])],
  controllers: [FactorsController, FactorsItemController],
  providers: [FactorsService, FactorsItemService, jwtStrategy],
})
export class FactorsModule { }

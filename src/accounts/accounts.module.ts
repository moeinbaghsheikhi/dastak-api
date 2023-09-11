import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { Products } from 'src/products/entities/products.entity';
import { Categories } from 'src/products/entities/categories.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtStrategy } from 'src/strategies/jwt.strategy';
import { env } from 'process';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret' ,
      signOptions: { expiresIn: '30d' }

    }),
    TypeOrmModule.forFeature([Accounts, Products, Categories]), HttpModule],
  controllers: [AccountsController],
  providers: [AccountsService, jwtStrategy],
})
export class AccountsModule { }

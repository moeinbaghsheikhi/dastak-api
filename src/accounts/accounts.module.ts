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
import { Wallet } from 'src/finance/wallet/entities/wallet.entity';
import { WalletController } from 'src/finance/wallet/wallet.controller';
import { WalletService } from 'src/finance/wallet/wallet.service';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '30d' }

    }),
    TypeOrmModule.forFeature([Accounts, Products, Categories, Wallet]), HttpModule],
  controllers: [AccountsController],
  providers: [AccountsService, jwtStrategy,WalletService],
})
export class AccountsModule { }

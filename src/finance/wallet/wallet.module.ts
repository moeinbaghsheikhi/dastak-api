import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Wallet } from './entities/wallet.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '30d' }

    }),
    TypeOrmModule.forFeature([Accounts, Wallet]), HttpModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule { }

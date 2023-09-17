import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';
import { BankAccountsController } from './bank_accounts.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank_account.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '30d' }

    }),
    TypeOrmModule.forFeature([BankAccount, Wallet]), HttpModule],
  controllers: [BankAccountsController],
  providers: [BankAccountsService],
})
export class BankAccountsModule {}

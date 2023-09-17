import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from '../wallet/entities/wallet.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '30d' }

    }),
    TypeOrmModule.forFeature([Transaction, Wallet]), HttpModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule { }

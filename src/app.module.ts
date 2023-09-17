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
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './finance/wallet/wallet.module';
import { BankAccountsModule } from './finance/bank_accounts/bank_accounts.module';
import { TransactionsModule } from './finance/transactions/transactions.module';
import { Wallet } from './finance/wallet/entities/wallet.entity';
import { Transaction } from './finance/transactions/entities/transaction.entity';
import { BankAccount } from './finance/bank_accounts/entities/bank_account.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'dastak',
      entities: [Accounts, Factors, Factor_items, Categories, Products, Wallet, Transaction, BankAccount],
      synchronize: true
    }),
    ConfigModule.forRoot(),
    AccountsModule,
    FactorsModule,
    ProductsModule,
    WalletModule,
    BankAccountsModule,
    TransactionsModule,
  ]
})
export class AppModule { }

import { HttpException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';


@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction) private TransactionRepository: Repository<Transaction>
  ) { }


  async create(createTransactionDto: CreateTransactionDto) {
  }

  findAll() {
  }

  findOne(id: number) {
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
  }

  remove(id: number) {
  }
}

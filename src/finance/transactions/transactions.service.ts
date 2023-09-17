import { HttpException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction) private TransactionRepository: Repository<Transaction>,
    private readonly jwtService: JwtService

  ) { }


  async create(token: string, createTransactionDto: CreateTransactionDto) {
    const accountToken = await this.jwtService.verify(token.substr(7))
    const wallets = await this.walletRepository.findOneBy({ id: accountToken.wallet_id })
    if (!wallets)
      return

    const newTransaction = await this.TransactionRepository.create({
      ...createTransactionDto,
      wallets
    })

    return this.TransactionRepository.save(newTransaction)
  }

  findAll() {
    return this.TransactionRepository.find({
      order: {
        id: {
          direction: "ASC"
        }
      }
    })
  }

  findOne(id: number) {
    return this.TransactionRepository.findOneBy({ id })
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.TransactionRepository.update({ id }, { ...updateTransactionDto })
  }

  remove(id: number) {
    return this.TransactionRepository.delete(id)
  }
}

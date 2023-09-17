import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../wallet/entities/wallet.entity';
import { BankAccount } from './entities/bank_account.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(BankAccount) private bankAccountRepository: Repository<BankAccount>,
    private readonly jwtService: JwtService

  ) { }


  async create(token: string, createBankAccountDto: CreateBankAccountDto) {
    const accountToken = await this.jwtService.verify(token.substr(7))
    const wallets = await this.walletRepository.findOneBy({ id: accountToken.wallet_id })
    if (!wallets)
      return

    const newTransaction = await this.bankAccountRepository.create({
      ...createBankAccountDto,
      wallets
    })
    return this.bankAccountRepository.save(newTransaction)
  }

  findAll() {
    return this.bankAccountRepository.find({
      relations: ['wallets'],
      order: {
        id: {
          direction: "ASC"
        }
      }
    })
  }

  findOne(id: number) {
    return this.bankAccountRepository.findOneBy({ id })
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return this.bankAccountRepository.update({ id }, { ...updateBankAccountDto })
  }

  remove(id: number) {
    return this.bankAccountRepository.delete(id)
  }
}

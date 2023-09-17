import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    private readonly jwtService: JwtService

  ) { }


  async create(mobile: string) {
    const wallet = this.walletRepository.create({
      amount: 0,
      accounts_mobile: mobile,

    })
    return this.walletRepository.save(wallet)
  }

  findAll() {
    return this.walletRepository.find({
      relations: ['bankAccounts','transactions' ],
      order: {
        id: {
          direction: "ASC"
        }
      }
    })

  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return this.walletRepository.update({ id }, { ...updateWalletDto })
  }
}

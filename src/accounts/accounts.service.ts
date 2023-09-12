import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Wallet } from 'src/finance/wallet/entities/wallet.entity';


@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) { }


  async create(wallet, createAccountDto: CreateAccountDto) {

    createAccountDto.password = await bcrypt.hash(createAccountDto.password, 10)
    const account = this.accountRepository.create({
      ...createAccountDto,
      wallets: wallet
    })
    return this.accountRepository.save(account)
  }

  async findAll() {
    console.log(await this.accountRepository.find({
      relations: ['wallets'],
      order: {
        id: {
          direction: "ASC"
        }
      }
    }))
    return this.accountRepository.find({
      relations: ['wallets'],
      order: {
        id: {
          direction: "ASC"
        }
      }
    });
  }

  async findOne(token: string) {
    const accountToken = await this.jwtService.verify(token.substr(7))
    return this.accountRepository.findOneBy({ id: accountToken.account_id });
  }

  findOneByMobile(mobile: string) {
    return this.accountRepository.findOneBy({ mobile });
  }

  async updateOtp(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update({ id }, { ...updateAccountDto });
  }

  async update(token: string, updateAccountDto: UpdateAccountDto) {
    const accountToken = await this.jwtService.verify(token.substr(7))
    return this.accountRepository.update({ id: accountToken.account_id }, { ...updateAccountDto });
  }

  async remove(token: string) {
    const accountToken = await this.jwtService.verify(token.substr(7))
    console.log(accountToken)
    return 'this.accountRepository.delete(accountToken.account_id);'
  }

  findByMobile(mobile: string) {
    return this.accountRepository.findOneBy({ mobile })
  }

  async login(mobile: string, password: string) {
    const account = await this.accountRepository.findOne({ where: { mobile: mobile } })
    const isPassword = await bcrypt.compare(password, account.password)

    if (isPassword){
      const token = this.jwtService.sign({
        account_id: account.id,
        name: account.name,
        mobile: account.mobile,
        password: account.password
      })

      return {...account, token}
    }
    return null
  }

  async otpsend(mobile: string, code: string) {
    // var data = JSON.stringify({
    //   from: '50004001882813',
    //   to: mobile,
    //   text: "رمز عبور جدید شما در دستک: " + code + "\n از این به بعد میتوانید با این کد 4 رقمی وارد حساب خود در دستک شوید.",
    // });

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },

    // };

    // try {
    //   const response = await this.httpService
    //     .post('http://api.payamak-panel.com/post/send.asmx', data, config)
    //     .toPromise();
    //   console.log(JSON.stringify(response.data));
    // } catch (error) {
    //   console.log(error);
    // }

    // Send by pattern
      try {
      const response = await this.httpService
        .get('http://api.payamak-panel.com/post/Send.asmx/SendByBaseNumber3?username=09135882813&password=T13Y7&text=@161754@'+code+';&to='+mobile)
        .toPromise();
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }
}

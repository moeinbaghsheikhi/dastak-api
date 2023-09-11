import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>, private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) { }


  async create(createAccountDto: CreateAccountDto) {
    createAccountDto.password = await bcrypt.hash(createAccountDto.password, 10)
    const account = this.accountRepository.create({ ...createAccountDto })
    return this.accountRepository.save(account)
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  findOneByMobile(mobile: string) {
    return this.accountRepository.findOneBy({ mobile });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update({ id }, { ...updateAccountDto });
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }

  findByMobile(mobile: string) {
    return this.accountRepository.findOneBy({ mobile })
  }

  async login(mobile: string, password: string) {
    const account = await this.accountRepository.findOne({ where: { mobile: mobile } })
    const isPassword = await bcrypt.compare(password, account.password)

    if (isPassword)
      return this.jwtService.sign({
        account_id: account.id,
        name: account.name,
        mobile: account.mobile,
        password: account.password
      })
    return null
  }

  async otpsend(mobile: string, code: string) {
    var data = JSON.stringify({
      from: '50004001882813',
      to: mobile,
      text: "رمز عبور جدید شما در دستک: " + code + "\n از این به بعد میتوانید با این کد 4 رقمی وارد حساب خود در دستک شوید.",
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },

    };

    try {
      const response = await this.httpService
        .post('https://console.melipayamak.com/api/send/simple/3cb7d173f4444f409640e09294adacc3', data, config)
        .toPromise();
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }
}

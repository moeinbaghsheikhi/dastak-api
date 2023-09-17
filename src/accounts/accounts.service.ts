import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>, private readonly httpService: HttpService
  ) { }


  create(createAccountDto: CreateAccountDto) {
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

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update({ id }, { ...updateAccountDto });
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }

  findByMobile(mobile: string) {
    return this.accountRepository.findOneBy({ mobile })
  }

  login(mobile: string, password: string) {
    return this.accountRepository.findOne({where: {mobile: mobile, password: password}})
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

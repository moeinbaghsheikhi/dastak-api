import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>
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

}

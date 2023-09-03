import { Injectable } from '@nestjs/common';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { Factors } from './entities/factors.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class FactorsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
    @InjectRepository(Factors) private factorsRepository: Repository<Factors>
  ) { }

  async create(createFactorDto: CreateFactoresDto) {
    const accounts = await this.accountRepository.findOneBy({ id: createFactorDto.account_id })
    if (!accounts)
      throw new HttpException('Account Not Found', HttpStatus.BAD_REQUEST)

    const newFactor = this.factorsRepository.create({
      ...createFactorDto,
      accounts
    })
    return this.factorsRepository.save(newFactor)
  }

  findAll() {
    return this.factorsRepository.find()
  }

  findOne(id: number) {
    return this.factorsRepository.findOneBy({ id });
  }

  update(id: number, updateFactorDto: UpdateFactoresDto) {
    return this.factorsRepository.update({ id }, { ...updateFactorDto })
  }

  remove(id: number) {
    return this.factorsRepository.delete(id)
  }
}

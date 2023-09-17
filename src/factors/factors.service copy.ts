import { Injectable } from '@nestjs/common';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { Factors } from './entities/factors.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FactorsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
    @InjectRepository(Factors) private factorsRepository: Repository<Factors>,
    private readonly jwtService: JwtService

  ) { }

  // ایجاد یک فاکتور جدید
  async create(token: string, createFactorDto: CreateFactoresDto, code: string) {
    // یافتن حساب متناظر با شناسه
    const accountToken = await this.jwtService.verify(token.substr(7))
    const account = await this.accountRepository.findOneBy({ id: accountToken.account_id });

    // بررسی وجود حساب
    if (!account)
      return;

    // ایجاد یک فاکتور جدید با استفاده از داده‌های دریافتی
    const newFactor = this.factorsRepository.create({
      ...createFactorDto,
      code,
      account
    });

    // ذخیره فاکتور جدید در دیتابیس
    return this.factorsRepository.save(newFactor);
    // const a = token.substr(7)
    // const test = await this.jwtService.verify(a)
    // console.log(test)
  }

  // بازیابی تمامی فاکتورها
  findAll() {
    return this.factorsRepository.find({ relations: ['factor_items', 'account'] });
  }

  // بازیابی یک فاکتور با شناسه مشخص
 async findOne(code: string) {
    // return this.factorsRepository.findOne({ relations: ['factor_items'], where: {id} });
    return this.factorsRepository.createQueryBuilder('factor')
      .leftJoinAndSelect('factor.account', 'account')
      .leftJoinAndSelect('factor.factor_items', 'factor_items')
      .leftJoinAndSelect('factor_items.product', 'products')
      .where('factor.code = :code', { code })
      .getOne();

  }

  // به‌روزرسانی یک فاکتور با شناسه مشخص
  update(id: number, updateFactorDto: UpdateFactoresDto) {
    return this.factorsRepository.update({ id }, { ...updateFactorDto });
  }

  // حذف یک فاکتور با شناسه مشخص
  remove(id: number) {
    return this.factorsRepository.delete(id);
  }

  async findByCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    while (true) {

      for (let counter = 0; counter < 5; counter++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      const test = await this.factorsRepository.findOneBy({ code: result })

      if (!test)
        break
    }

    return result
  }
}

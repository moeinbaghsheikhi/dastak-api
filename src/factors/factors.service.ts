import { Injectable } from '@nestjs/common';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { Factors } from './entities/factors.entity';

@Injectable()
export class FactorsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
    @InjectRepository(Factors) private factorsRepository: Repository<Factors>
  ) { }

  // ایجاد یک فاکتور جدید
  async create(createFactorDto: CreateFactoresDto, code: string) {
    // یافتن حساب متناظر با شناسه
    const account = await this.accountRepository.findOneBy({ id: createFactorDto.account_id });

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
  }

  // بازیابی تمامی فاکتورها
  findAll() {
    return this.factorsRepository.find({ relations: ['factor_items', 'account'] });
  }

  // بازیابی یک فاکتور با شناسه مشخص
  async findOne(code: string) {
    // return this.factorsRepository.findOne({ relations: ['factor_items'], where: {id} });
    return this.factorsRepository.createQueryBuilder('factor')
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

  async makeCode() {
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

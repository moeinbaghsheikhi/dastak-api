import { Injectable } from '@nestjs/common';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { Factors } from './entities/factors.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateFactoresItemDto } from './dto/create-factores_item.dto';
import { Factor_items } from './entities/factor_item.entity';
import { Products } from 'src/products/entities/products.entity';

@Injectable()
export class FactorsItemService {
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Factor_items) private factorsItemRepository: Repository<Factor_items>,
        @InjectRepository(Factors) private factorsRepository: Repository<Factors>
    ) { }

    // ایجاد یک آیتم فاکتور جدید
    async create(createFactorItemDto: CreateFactoresItemDto) {
        // یافتن فاکتور متناظر با شناسه
        const factors = await this.factorsRepository.findOneBy({ id: createFactorItemDto.factor_id });
        // یافتن محصول متناظر با شناسه
        const products = await this.productsRepository.findOneBy({ id: createFactorItemDto.product_id });

        // بررسی وجود فاکتور و محصول
        if (!factors)
            throw new HttpException('فاکتور یافت نشد', HttpStatus.BAD_REQUEST);
        if (!products)
            throw new HttpException('محصول یافت نشد', HttpStatus.BAD_REQUEST);

        // ایجاد یک آیتم فاکتور جدید با استفاده از داده‌های دریافتی
        const newFactorItem = this.factorsItemRepository.create({
            ...createFactorItemDto,
            factors,
            products
        });

        // ذخیره آیتم فاکتور جدید در دیتابیس
        return this.factorsItemRepository.save(newFactorItem);
    }

    // بازیابی تمامی آیتم‌های فاکتور
    findAll() {
        return this.factorsItemRepository.find({ relations: ['products', 'factors'] });
    }

    // بازیابی یک آیتم فاکتور با شناسه مشخص
    findOne(id: number) {
        return this.factorsItemRepository.findOneBy({ id });
    }

    // حذف یک آیتم فاکتور با شناسه مشخص
    remove(id: number) {
        return this.factorsItemRepository.delete(id);
    }
}

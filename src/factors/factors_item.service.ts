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

    async create(createFactorItemDto: CreateFactoresItemDto) {
        const factors = await this.factorsRepository.findOneBy({ id: createFactorItemDto.factor_id })
        const products = await this.productsRepository.findOneBy({ id: createFactorItemDto.product_id })
        if (!factors)
            throw new HttpException('factor Not Found', HttpStatus.BAD_REQUEST)
        if (!products)
            throw new HttpException('product Not Found', HttpStatus.BAD_REQUEST)


        const newFactor = this.factorsItemRepository.create({
            ...createFactorItemDto,
            factors,
            products
        })
        return this.factorsItemRepository.save(newFactor)
    }

    findAll() {
        return this.factorsItemRepository.find({ relations: ['products', 'factors'] })
    }

    findOne(id: number) {
        return this.factorsItemRepository.findOneBy({ id });
    }

    // update(id: number, updateFactorDto: UpdateFactoresDto) {
    //     return this.factorsItemRepository.update({ id }, { ...updateFactorDto })
    // }

    remove(id: number) {
        return this.factorsItemRepository.delete(id)
    }
}

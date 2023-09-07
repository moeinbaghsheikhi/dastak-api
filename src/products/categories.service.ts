import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository } from 'typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
        @InjectRepository(Accounts) private accountRepository: Repository<Accounts>
    ) { }


    async create(createCategoriesDto: CreateCategoriesDto) {
        const account = await this.accountRepository.findOneBy({ id: createCategoriesDto.account_id })
        console.log(account)
        if (!account)
            throw new HttpException('Account Not Found', HttpStatus.BAD_REQUEST)

        const newCategories = this.categoriesRepository.create({ ...createCategoriesDto, account })
        return this.categoriesRepository.save(newCategories)
    }

    findAll() {
        return this.categoriesRepository.find();
    }

    findOne(id: number) {
        return this.categoriesRepository.findOneBy({ id })
    }

    update(id: number, updateCategoriesDto: UpdateCategoriesDto) {
        return this.categoriesRepository.update({ id }, { ...updateCategoriesDto })
    }

    remove(id: number) {
        return this.categoriesRepository.delete(id)
    }
}

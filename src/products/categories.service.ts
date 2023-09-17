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
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
        @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
        private readonly jwtService: JwtService

    ) { }


    async create(token: string, createCategoriesDto: CreateCategoriesDto) {
        const accountToken = await this.jwtService.verify(token.substr(7))
        const account = await this.accountRepository.findOneBy({ id: accountToken.account_id })
        console.log(account)
        if (!account)
            throw new HttpException('Account Not Found', HttpStatus.BAD_REQUEST)

        const newCategories = this.categoriesRepository.create({ ...createCategoriesDto, account })
        return this.categoriesRepository.save(newCategories)
    }

    findAll() {
        return this.categoriesRepository.find({ relations: ['account'] });
    }

    findOne(id: number) {
        return this.categoriesRepository.findOneBy({ id })
    }

    async update(token: string, id: number, updateCategoriesDto: UpdateCategoriesDto) {
        const accountToken = await this.jwtService.verify(token.substr(7))
        const account = await this.accountRepository.findOneBy({ id: accountToken.account_id })
        return this.categoriesRepository.update({ id }, { ...updateCategoriesDto, account })
    }

    remove(id: number) {
        return this.categoriesRepository.delete(id)
    }
}

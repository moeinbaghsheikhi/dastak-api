import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository } from 'typeorm';
import { Accounts } from 'src/accounts/entities/account.entity';
import { Categories } from './entities/categories.entity';
import { ParseIntPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productsRepository: Repository<Products>,
    @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
    private readonly jwtService: JwtService
  ) { }


  async create(token: string, categories_id: number, createProductsDto: CreateProductsDto) {
    const accountToken = await this.jwtService.verify(token.substr(7))
    const account = await this.accountRepository.findOneBy({ id: accountToken.account_id });
    const category = await this.categoriesRepository.findOneBy({ id: categories_id })

    if (!account) {
      throw new HttpException('account Not Found', HttpStatus.BAD_REQUEST);
    }
    if (categories_id && !category) {
      throw new HttpException('categories Not Found', HttpStatus.BAD_REQUEST);
    }

    const newProduct = this.productsRepository.create({
      ...createProductsDto,
      account,
      category
    })
    return await this.productsRepository.save(newProduct)
  }

  findAll() {
    return this.productsRepository.find({ relations: ['category', 'account'] })
  }

  findOne(id: number) {
    return this.productsRepository.findOne({ relations: ['category', 'account'], where: { id } });
  }

  update(id: number, updateProductsDto: UpdateProductsDto) {
    return this.productsRepository.update({ id }, { ...updateProductsDto });
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}

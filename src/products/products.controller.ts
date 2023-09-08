import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(
    @Body() createProductDto: CreateProductsDto) {
    const data = await this.productsService.create(createProductDto.account_id, createProductDto.categories_id, createProductDto);
    return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data)
  }

  @Get()
  async findAll() {
    const data = await this.productsService.findAll();

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductsDto) {
    const data = await this.productsService.update(+id, updateProductDto);
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.productsService.remove(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

}

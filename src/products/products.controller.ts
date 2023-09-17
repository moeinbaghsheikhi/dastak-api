import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { Headers } from '@nestjs/common/decorators';
@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Post()
  async create(@Headers('authorization') token: string, @Body() createProductDto: CreateProductsDto) {
    const data = await this.productsService.create(token, createProductDto.categories_id, createProductDto);
    return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get()
  async findAll() {
    const data = await this.productsService.findAll();

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Patch(':id')
  async update(@Headers('authorization') token: string, @Param('id') id: number, @Body() updateProductDto: UpdateProductsDto) {
    const data = await this.productsService.update(token, +id, updateProductDto);
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.productsService.remove(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

}

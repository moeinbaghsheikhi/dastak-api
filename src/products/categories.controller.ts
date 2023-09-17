import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Patch } from '@nestjs/common';
import { UpdateProductsDto } from './dto/update-products.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { Headers } from '@nestjs/common/decorators';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @ApiBearerAuth()
    @UseGuards(JwtTokenGuard)
    @Post()
    async create(@Headers('authorization') token: string, @Body() createCategoriesDto: CreateCategoriesDto) {
        const data = await this.categoriesService.create(token, createCategoriesDto);
        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @ApiBearerAuth()
    @UseGuards(JwtTokenGuard)
    @Get()
    async findAll() {
        const data = await this.categoriesService.findAll();

        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @ApiBearerAuth()
    @UseGuards(JwtTokenGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.categoriesService.findOne(+id);
        if (!data)
            return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @ApiBearerAuth()
    @UseGuards(JwtTokenGuard)
    @Patch(':id')
    async update(@Headers('authorization') token: string,@Param('id') id: string, @Body() updateCategoriesDto: UpdateCategoriesDto) {
        const data = await this.categoriesService.update(token, +id, updateCategoriesDto);
        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @ApiBearerAuth()
    @UseGuards(JwtTokenGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const data = await this.categoriesService.remove(+id);
        if (!data)
            return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

}

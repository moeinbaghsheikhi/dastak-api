import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Patch } from '@nestjs/common';
import { UpdateProductsDto } from './dto/update-products.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    async create(@Body() createCategoriesDto: CreateCategoriesDto) {
        const data = await this.categoriesService.create(createCategoriesDto);
        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @Get()
    async findAll() {
        const data = await this.categoriesService.findAll();

        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.categoriesService.findOne(+id);
        if (!data)
            return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCategoriesDto: UpdateCategoriesDto) {
        const data = await this.categoriesService.update(+id, updateCategoriesDto);
        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const data = await this.categoriesService.remove(+id);
        if (!data)
            return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

        return ResponseFormat(true, HttpStatus.OK, "OK", data)
    }

}

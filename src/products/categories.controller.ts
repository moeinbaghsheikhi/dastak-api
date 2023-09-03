import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UpdateProductsDto } from './dto/update-products.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    create(
        @Body() createCategoriesDto: CreateCategoriesDto) {
        return this.categoriesService.create(createCategoriesDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCategoriesDto: UpdateCategoriesDto) {
        return this.categoriesService.update(+id, updateCategoriesDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }

}

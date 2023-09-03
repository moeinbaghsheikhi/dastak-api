import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UpdateFactoresItemDto } from './dto/update-factores_item.dto';
import { CreateFactoresItemDto } from './dto/create-factores_item.dto';
import { FactorsItemService } from './factors_item.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('factors_item')
@ApiTags('factors_item')
export class FactorsItemController {
  constructor(private readonly factorsItemService: FactorsItemService) {}

  // اكشن برای ایجاد یک آیتم فاکتور جدید
  @Post()
  create(@Body() createFactorDto: CreateFactoresItemDto) {
    return this.factorsItemService.create(createFactorDto);
  }

  // اكشن برای دریافت تمامی آیتم‌های فاکتور
  @Get()
  findAll() {
    return this.factorsItemService.findAll();
  }

  // اكشن برای دریافت یک آیتم فاکتور توسط شناسه
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factorsItemService.findOne(+id);
  }
  
  // اكشن برای حذف یک آیتم فاکتور توسط شناسه
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factorsItemService.remove(+id);
  }
}

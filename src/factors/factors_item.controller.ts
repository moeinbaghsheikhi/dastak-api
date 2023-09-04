import { Controller, Get, Post, Body, Param, Delete, HttpStatus } from '@nestjs/common';
import { UpdateFactoresItemDto } from './dto/update-factores_item.dto';
import { CreateFactoresItemDto } from './dto/create-factores_item.dto';
import { FactorsItemService } from './factors_item.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';

@Controller('factors_item')
@ApiTags('factors_item')
export class FactorsItemController {
  constructor(private readonly factorsItemService: FactorsItemService) { }

  // اكشن برای ایجاد یک آیتم فاکتور جدید
  @Post()
  async create(@Body() createFactorDto: CreateFactoresItemDto) {
    const data = await this.factorsItemService.create(createFactorDto);
    return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data)
  }

  // اكشن برای دریافت تمامی آیتم‌های فاکتور
  @Get()
  async findAll() {
    const data = await this.factorsItemService.findAll();
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // اكشن برای دریافت یک آیتم فاکتور توسط شناسه
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.factorsItemService.findOne(+id);
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // اكشن برای حذف یک آیتم فاکتور توسط شناسه
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.factorsItemService.remove(+id);
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }
}

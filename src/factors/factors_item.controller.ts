import { Controller, Get, Post, Body, Param, Delete, HttpStatus } from '@nestjs/common';
import { UpdateFactoresItemDto } from './dto/update-factores_item.dto';
import { CreateFactoresItemDto } from './dto/create-factores_item.dto';
import { FactorsItemService } from './factors_item.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('factors_item')
@ApiTags('factors_item')
export class FactorsItemController {
  constructor(private readonly factorsItemService: FactorsItemService) { }

  // اكشن برای ایجاد یک آیتم فاکتور جدید
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Post()
  async create(@Body() createFactorDto: CreateFactoresItemDto) {
    const data = await this.factorsItemService.create(createFactorDto);
    return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data)
  }

  // اكشن برای دریافت تمامی آیتم‌های فاکتور
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get()
  async findAll() {
    const data = await this.factorsItemService.findAll();
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // اكشن برای دریافت یک آیتم فاکتور توسط شناسه
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.factorsItemService.findOne(+id);
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // اكشن برای حذف یک آیتم فاکتور توسط شناسه
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.factorsItemService.remove(+id);
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }
}

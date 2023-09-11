import { Controller, Get, Post, Body, Header, Put, Param, Delete, HttpStatus, Patch } from '@nestjs/common';
import { FactorsService } from './factors.service';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { Headers, UseGuards } from '@nestjs/common/decorators';

@Controller('factors')
@ApiTags('factors')
export class FactorsController {
  constructor(private readonly factorsService: FactorsService) { }

  // ایجاد یک فاکتور جدید
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async create(@Headers('authorization') token: string, @Body() createFactorDto: CreateFactoresDto) {
    try {
      const code = await this.factorsService.findByCode()
      const data = await this.factorsService.create(token, createFactorDto, code);

      if (data == null)
        return ResponseFormat(false, HttpStatus.BAD_REQUEST, "Account Not Found", null)
      return ResponseFormat(true, HttpStatus.CREATED, "OK", data)

    } catch (error) {
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", error);
    }
  }

  // بازیابی تمامی فاکتورها
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get()
  async findAll() {
    const data = await this.factorsService.findAll();

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // بازیابی یک فاکتور با شناسه مشخص
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.factorsService.findOne(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // به‌روزرسانی یک فاکتور با شناسه مشخص
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFactorDto: UpdateFactoresDto) {
    try {
      const data = await this.factorsService.update(+id, updateFactorDto);
      return ResponseFormat(true, HttpStatus.OK, "OK", data)
    } catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }

  }

  // حذف یک فاکتور با شناسه مشخص
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.factorsService.remove(+id);
    if (data[0] == null)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }
}
